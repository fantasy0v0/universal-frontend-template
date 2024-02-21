import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
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
import {NzIconDirective} from "ng-zorro-antd/icon";

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
    NzIconDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent extends BaseComponent {

  formGroup = new FormGroup({
    password: new FormControl("", [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ]),
    newPassword: new FormControl("", [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ]),
    repeat: new FormControl("", [ passwordMatcherValidator ])
  });

  passwordVisible = signal(false);

  private modal = inject(NzModalRef);

  private userService = inject(BackendUserService);

  private message = inject(NzMessageService);

  constructor() {
    super();
    this.modal.updateConfig({
      nzFooter: [
        {
          label: '确认',
          type: 'primary',
          show: true,
          onClick: () => this.submitForm()
        },
        {
          label: '取消',
          type: 'default',
          show: true,
          onClick: () => this.modal.close()
        }
      ]
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const password = this.formGroup.getRawValue().password!;
    const newPassword = this.formGroup.getRawValue().newPassword!;
    await this.action(async () => {
      await this.userService.changePassword(password, newPassword);
      this.message.success('密码修改成功');
      this.destroyModal();
    });
  }

}
