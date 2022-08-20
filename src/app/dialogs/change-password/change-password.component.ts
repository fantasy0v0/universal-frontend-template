import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {errorMessage, formGroupInvalid} from "../../services/common";
import {NzModalRef} from "ng-zorro-antd/modal";
import {UniversalUserService} from "../../services/universal-user/universal-user.service";
import { NzMessageService } from 'ng-zorro-antd/message';

function passwordMatcherValidator(control: AbstractControl): ValidationErrors | null {
  if (null == control.parent) {
    return null;
  }
  const password = control.parent.get('newPassword');
  const repeat = control.value;
  if (null == repeat || '' === repeat || repeat !== password?.value) {
    return {
      NotEquals: true
    };
  }
  return null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  constructor(private modal: NzModalRef,
              private userService: UniversalUserService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
      password: new FormControl("", [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ]),
      newPassword: new FormControl("", [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ]),
      repeat: new FormControl("", [ passwordMatcherValidator ])
    });
  }

  ngOnInit(): void {

  }

  destroyModal(): void {
    this.modal.destroy();
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const password = this.formGroup.get('password')?.value;
    const newPassword = this.formGroup.get('newPassword')?.value;
    const ref = this.message.loading("修改中");
    try {
      await this.userService.changePassword(password, newPassword);
      this.message.success('密码修改成功');
      this.destroyModal();
    } catch (e) {
      const msg = errorMessage(e, "密码修改失败");
      this.message.error(msg);
    } finally {
      this.message.remove(ref.messageId);
    }
  }

}
