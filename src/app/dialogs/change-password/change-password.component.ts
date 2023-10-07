import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {formGroupInvalid} from "../../services/util";
import {NzModalRef} from "ng-zorro-antd/modal";
import {BackendUserService} from "../../services/system/user/backend-user.service";
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {BaseComponent} from "../../util/base.component";

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
  standalone: true,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ]
})
export class ChangePasswordComponent extends BaseComponent {

  formGroup = new FormGroup({
    password: new FormControl("", [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ]),
    newPassword: new FormControl("", [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ]),
    repeat: new FormControl("", [ passwordMatcherValidator ])
  });

  private modal = inject(NzModalRef);

  private userService = inject(BackendUserService);

  private message = inject(NzMessageService);

  destroyModal(): void {
    this.modal.destroy();
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const password = this.formGroup.getRawValue().password!;
    const newPassword = this.formGroup.getRawValue().newPassword!;
    this.startLoading();
    try {
      await this.userService.changePassword(password, newPassword);
      this.message.success('密码修改成功');
      this.destroyModal();
    } catch (e) {
      this.error.process(e, "密码修改失败");
    } finally {
      this.stopLoading();
    }
  }

}
