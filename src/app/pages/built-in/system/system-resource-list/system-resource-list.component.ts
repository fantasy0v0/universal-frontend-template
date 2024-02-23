import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzTreeModule, NzTreeNode, NzTreeNodeOptions} from "ng-zorro-antd/tree";
import {
  BackendResourceService
} from "../../../../services/built-in/system/resource/backend-resource.service";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {
  BackendResourceVO
} from "../../../../services/built-in/system/resource/vo/BackendResourceVO";
import {NzFormatEmitEvent} from "ng-zorro-antd/core/tree/nz-tree-base.definitions";
import {
  BackendActionService
} from "../../../../services/built-in/system/action/backend-action.service";
import {BackendActionVO} from "../../../../services/built-in/system/action/vo/BackendActionVO";
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzDropDownModule
} from "ng-zorro-antd/dropdown";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {BaseComponent} from "../../../../util/base.component";
import {NzMessageModule, NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-system-resource-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzModalModule,
    NzMessageModule
  ],
  templateUrl: './system-resource-list.component.html',
  styleUrls: ['./system-resource-list.component.scss']
})
export class SystemResourceListComponent extends BaseComponent {

  private resourceService = inject(BackendResourceService);

  private actionService = inject(BackendActionService);

  private nzContextMenuService = inject(NzContextMenuService);

  private elementRef = inject(ElementRef<HTMLElement>);

  resources: BackendResourceVO[] = [];

  actions: BackendActionVO[] = [];

  nodes: NzTreeNodeOptions[] = [];

  @ViewChild(NzDropdownMenuComponent)
  menu!: NzDropdownMenuComponent;

  selectedNode?: NzTreeNode;

  private modal = inject(NzModalService);

  private message = inject(NzMessageService);

  override ngOnInit(): void {
    this.refresh()
    this.elementRef.nativeElement.oncontextmenu = (event: MouseEvent) => {
      this.nzContextMenuService.create(event, this.menu);
    }
  }

  private buildNodeFromResource(resource: BackendResourceVO): NzTreeNodeOptions {
    return {
      key: `r${resource.id}`,
      isLeaf: false,
      title: resource.name,
      flag: resource.flag,
      remark: resource.remarks
    };
  }

  private buildNodeFromAction(action: BackendActionVO): NzTreeNodeOptions {
    return {
      key: `a${action.id}`,
      isLeaf: true,
      title: action.name,
      flag: action.flag,
      remark: action.remarks
    };
  }

  async refresh() {
    this.startLoading();
    try {
      const resources = await this.resourceService.findAll();
      this.resources = resources;
      this.actions = await this.actionService.findAll();
      this.nodes = resources.filter(r => r.parent == undefined).map(r => this.buildNodeFromResource(r));
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  nzExpandChange($event: NzFormatEmitEvent) {
    if ('expand' !== $event.eventName && 'dblclick' !== $event.eventName) {
      return;
    }
    const node = $event.node;
    if (null == node || 0 !== node.children.length || !node.isExpanded) {
      return;
    }
    const type = node.key.substring(0, 1);
    if ('r' !== type) {
      return;
    }
    const resourceId = +node.key.substring(1);
    const resources = this.resources.filter(r => r.parent === resourceId)
      .map(r => this.buildNodeFromResource(r));
    const actions = this.actions.filter(a => a.resource === resourceId)
      .map(a => this.buildNodeFromAction(a));
    node.addChildren([...resources, ...actions]);
    console.log(this.nodes);
  }

  expandNode($event: NzFormatEmitEvent) {
    const node = $event.node;
    if (node) {
      node.isExpanded = !node.isExpanded;
      this.nzExpandChange($event);
    }
  }

  openMenu($event: NzFormatEmitEvent, menu: NzDropdownMenuComponent) {
    let event = $event.event;
    if (null == event || event instanceof DragEvent) {
      return;
    }
    if (null != $event.node) {
      this.selectedNode = $event.node;
      this.selectedNode.isSelected = true;
    }
    this.nzContextMenuService.create(event, menu);
  }

  isResource() {
    if (null == this.selectedNode) {
      return false;
    }
    const type = this.selectedNode.key.substring(0, 1);
    return 'r' === type;
  }

  async toDelete() {
    const node = this.selectedNode;
    if (null == node) {
      return;
    }
    const type = node.key.substring(0, 1);
    const id = +node.key.substring(1);
    let typeName = '';
    if ('r' === type) {
      typeName = '资源';
    } else if ('a' === type) {
      typeName = '动作';
    } else {
      this.message.error('错误的分支');
      return;
    }
    let content = `<b>${typeName}编号: ${id} ${typeName}名称: ${node.title}</b>`;
    const result = await new Promise(resolve => {
      this.modal.confirm<boolean>({
        nzTitle: `是否确认删除${typeName}?`,
        nzContent: content,
        nzOnOk: () => resolve(true),
        nzOnCancel: () => resolve(false)
      });
    });
    this.startLoading();
    try {
      if ('r' === type) {
        await this.resourceService.deleteById(id);
      } else if ('a' === type) {
        typeName = '动作';
      } else {
        this.message.error('错误的分支');
        return;
      }
      this.message.success('删除成功');
      this.refresh();
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  toAddResource() {

  }
}
