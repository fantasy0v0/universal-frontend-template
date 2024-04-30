import { Injectable } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import { ChangePasswordComponent } from "../../../../dialogs/built-in/change-password/change-password.component";
import {SimpleDataVO} from "../../vo/SimpleDataVO";
import { BackendRoleUpdateComponent } from "../../../../dialogs/built-in/system/backend-role-update/backend-role-update.component";
import {firstValueFrom} from "rxjs";
import {BackendUserAddComponent} from "../../../../dialogs/built-in/system/backend-user-add/backend-user-add.component";

@Injectable({
  providedIn: 'root'
})
export class SystemDialogService {

  constructor(private modal: NzModalService) { }

  /**
   * 展示修改密码对话框
   */
  changePassword() {
    this.modal.create<ChangePasswordComponent, void>({
      nzTitle: "修改密码",
      nzContent: ChangePasswordComponent,
      nzFooter: null
    });
  }

  /**
   * 展示添加或更新角色对话框
   * @param data
   */
  backendRoleSaveOrUpdate(data?: SimpleDataVO) {
    let observable = this.modal.create<BackendRoleUpdateComponent, SimpleDataVO, boolean>({
      nzTitle: data ? "更新角色" : "添加角色",
      nzContent: BackendRoleUpdateComponent,
      nzData: data,
      nzFooter: null
    }).afterClose.asObservable();
    return firstValueFrom(observable);
  }

  /**
   * 添加用户添加对话框
   */
  systemUserAdd() {
    let observable = this.modal.create<BackendUserAddComponent, boolean>({
      nzTitle: "添加用户",
      nzContent: BackendUserAddComponent,
      nzFooter: null
    }).afterClose.asObservable();
    return firstValueFrom(observable);
  }
}
