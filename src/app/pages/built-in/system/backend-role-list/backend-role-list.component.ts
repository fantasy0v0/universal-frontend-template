import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BackendRoleService} from "../../../../services/built-in/system/role/backend-role.service";
import {SimpleDataVO} from "../../../../services/built-in/vo/SimpleDataVO";
import {NzMessageService} from "ng-zorro-antd/message";
import {
  SystemDialogService
} from "../../../../services/built-in/dialog/system/system-dialog.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {BackendRoleVO} from "../../../../services/built-in/system/role/vo/BackendRoleVO";
import {BaseComponent} from "../../../../util/base.component";

@Component({
  standalone: true,
  selector: 'app-backend-role-list',
  templateUrl: './backend-role-list.component.html',
  styleUrls: ['./backend-role-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule
  ]
})
export class BackendRoleListComponent extends BaseComponent {

  formGroup = new FormGroup({
    name: new FormControl<string | null>(null)
  });

  data: BackendRoleVO[] = [];

  private roleService = inject(BackendRoleService);

  private dialogService = inject(SystemDialogService);

  private message = inject(NzMessageService);

  override ngOnInit(): void {
    this.onSearch();
  }

  async onSearch() {
    this.startLoading();
    try {
      const name = this.formGroup.getRawValue().name;
      this.data = await this.roleService.findAll(name);
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  async deleteRole(item: SimpleDataVO) {
    this.startLoading();
    try {
      await this.roleService.deleteById(item.id);
      this.message.success("删除成功");
      this.onSearch();
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }

  async saveOrUpdate(data?: SimpleDataVO) {
    const result = await this.dialogService.backendRoleSaveOrUpdate(data);
    if (result) {
      this.onSearch();
    }
  }

}
