import { Injectable } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {ChangePasswordComponent} from "../../dialogs/change-password/change-password.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

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
}
