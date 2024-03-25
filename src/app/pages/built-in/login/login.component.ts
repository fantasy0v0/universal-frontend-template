import {Component, inject, signal} from '@angular/core';
import {BingService} from "../../../services/built-in/bing/bing.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {BackendUserService} from "../../../services/built-in/system/user/backend-user.service";
import {errorMessage, formGroupInvalid} from "../../../services/built-in/util";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {BaseComponent} from "../../../util/base.component";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule
  ]
})
export class LoginComponent extends BaseComponent {

  formGroup = new FormGroup({
    account: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    rememberMe: new FormControl(false)
  });

  private bingService = inject(BingService);

  private userService = inject(BackendUserService);

  private notification = inject(NzNotificationService);

  private router = inject(Router);

  backgroundImage = signal<string | undefined>(undefined);

  opacity = signal(.1);

  constructor() {
    super();
    this.bingService.wallpaper().then(url => {
      this.backgroundImage.set(`url(${ url })`);
      setTimeout(() => this.opacity.set(1), 100);
    });
  }

  submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const account = this.formGroup.getRawValue().account!;
    const password = this.formGroup.getRawValue().password!;
    const rememberMe = this.formGroup.getRawValue().rememberMe!;
    this.action(async () => {
      await this.userService.login(account, password, rememberMe);
      const ref = this.notification.success('登录成功', '正在加载中, 请稍后...', {
        nzDuration: 0
      });
      this.router.navigateByUrl('/main');
      setTimeout(() => {
        this.notification.remove(ref.messageId);
      }, 1000);
    }, {
      error: e => {
        const message = errorMessage(e);
        this.notification.error('登录失败', message, {
          nzPlacement: "topLeft"
        });
      },
      finally: () => {
        this.formGroup.enable();
      }
    });
  }

}
