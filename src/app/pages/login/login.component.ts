import {Component, inject} from '@angular/core';
import {BingService} from "../../services/bing/bing.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {BackendUserService} from "../../services/system/user/backend-user.service";
import {errorMessage, formGroupInvalid, sleep} from "../../services/util";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {BaseComponent} from "../../util/base.component";

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

  override ngOnInit(): void {
    this.bingService.wallpaper().then(url => {
      this.setBackgroundImage(url)
    });
  }

  private setBackgroundImage(url: string) {
    const element = document.querySelector('#wallpaper') as HTMLElement | null;
    if (null != element) {
      element.style.backgroundImage = `url(${ url })`;
      setTimeout(() => element.style.opacity = '1', 100);
    }
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const account = this.formGroup.getRawValue().account!;
    const password = this.formGroup.getRawValue().password!;
    const rememberMe = this.formGroup.getRawValue().rememberMe!;
    this.startLoading(() => {
      this.formGroup.disable();
    });
    try {
      await this.userService.login(account, password, rememberMe);
      const ref = this.notification.success('登录成功', '正在加载中, 请稍后...', {
        nzDuration: 0
      });
      this.router.navigateByUrl('/main');
      setTimeout(() => {
        this.notification.remove(ref.messageId);
      }, 1000);
    } catch (e) {
      const message = errorMessage(e);
      this.notification.error('登录失败', message);
    } finally {
      this.stopLoading({
        after: () => {
          this.formGroup.enable();
        }
      });
    }
  }

}
