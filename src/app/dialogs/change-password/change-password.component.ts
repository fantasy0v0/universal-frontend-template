import {Component, OnInit, signal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {formGroupInvalid} from "../../services/common";
import {NzModalRef} from "ng-zorro-antd/modal";
import {SystemUserService} from "../../services/system/user/system-user.service";
import {NzMessageService} from 'ng-zorro-antd/message';
import {ErrorService} from "../../services/error/error.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';

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
export class ChangePasswordComponent implements OnInit {

  formGroup: FormGroup;

  loading = signal(false);

  constructor(private modal: NzModalRef,
              private userService: SystemUserService,
              private message: NzMessageService,
              private error: ErrorService) {
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
    this.loading.set(true);
    const ref = this.message.loading("修改中");
    try {
      await this.userService.changePassword(password, newPassword);
      this.message.success('密码修改成功');
      this.destroyModal();
    } catch (e) {
      this.error.process(e, "密码修改失败");
    } finally {
      this.message.remove(ref.messageId);
      this.loading.set(false);
    }
  }

}
