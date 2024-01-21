import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BackendUserService} from "../../../../../services/system/user/backend-user.service";
import {SystemUserVO} from "../../../../../services/system/user/vo/SystemUserVO";
import {Paging} from "../../../../../services/util";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {
  SystemDialogService
} from "../../../../../services/dialog/system/system-dialog.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {SimpleDataVO} from "../../../../../services/vo/SimpleDataVO";
import {BackendRoleService} from "../../../../../services/system/role/backend-role.service";
import {BaseComponent} from "../../../../../util/base.component";

@Component({
  standalone: true,
  selector: 'app-system-user-list',
  templateUrl: './system-user-list.component.html',
  styleUrls: ['./system-user-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzSpaceModule,
    NzButtonModule,
    NzSelectModule,
    NzBadgeModule,
    NzIconModule,
    NzPopconfirmModule
  ]
})
export class SystemUserListComponent extends BaseComponent {

  formGroup = new FormGroup({
    role: new FormControl(-1),
    name: new FormControl<string | null>(null)
  });

  paging = Paging.of(1, 10);

  total = 0;

  data: SystemUserVO[] = [];

  /**
   * 角色列表
   */
  roles: SimpleDataVO[] = [{
    id: -1, name: "所有"
  }, {
    id: 1, name: "管理员"
  }]

  constructor(private userService: BackendUserService,
              private roleService: BackendRoleService,
              private modal: NzModalService,
              private dialogService: SystemDialogService,
              private message: NzMessageService) {
    super();
  }

  override ngOnInit(): void {
    this.refreshRole();
    this.onSearch();
  }

  async refreshRole() {
    try {
      const data = await this.roleService.findAll(null);
      this.roles = [{
        id: -1, name: "所有"
      }, ...data];
    } catch (e) {
      this.error.process(e);
    }
  }

  async onSearch() {
    this.startLoading();
    try {
      let a = this.formGroup.getRawValue().name
      let role = this.formGroup.getRawValue().role;
      if (-1 === role) {
        role = null;
      }
      const name = this.formGroup.getRawValue().name;
      const pagingResult = await this.userService.findAll(this.paging, name, role);
      this.total = pagingResult.total;
      this.data = pagingResult.data;
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  async restPassword(item: SystemUserVO) {
    this.startLoading();
    try {
      const newPassword = await this.userService.restPassword(item.id, 0);
      this.modal.success({
        nzTitle: "密码重置成功",
        nzContent: `新密码为: ${newPassword}`
      });
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  async enable(item: SystemUserVO, target: boolean) {
    this.startLoading();
    try {
      await this.userService.enable(item.id, target);
      this.message.success("操作成功");
      this.onSearch();
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  async toAddUser() {
    const result = await this.dialogService.systemUserAdd();
    if (result) {
      this.onSearch();
    }
  }
}
