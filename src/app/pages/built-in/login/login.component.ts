import {Component, ComponentRef, ElementRef, inject, NgZone, signal} from '@angular/core';
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
import {
  turnstileInit,
  turnstileIsExpired,
  turnstileRemove,
  turnstileReset
} from "../../../util/turnstile";
import {NzIconDirective} from "ng-zorro-antd/icon";

const Turnstile_Container = '.cf-turnstile';

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
    NzCheckboxModule,
    NzIconDirective
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

  /**
   * 遮罩背景图片
   */
  backgroundImage = signal<string | undefined>(undefined);

  /**
   * 遮罩透明度
   */
  opacity = signal(.1);

  private elementRef = inject(ElementRef);

  /**
   * 密码框是否显示明文
   */
  passwordVisible = signal(false);

  private zone = inject(NgZone);

  /**
   * 存储turnstile返回的token
   * @private
   */
  private turnstileToken?: string;

  constructor() {
    super();
    this.bingService.wallpaper().then(url => {
      this.backgroundImage.set(`url(${ url })`);
      setTimeout(() => this.opacity.set(1), 100);
    });
  }

  override ngOnInit() {
    this.loading.set(true);
    this.formGroup.disable();
    turnstileInit(this.elementRef, Turnstile_Container, {
      callback: token => {
        this.turnstileToken = token;
        this.zone.run(() => {
          this.formGroup.enable();
          this.loading.set(false);
        });
      },
      "error-callback": () => {
        this.notification.error('安全组件加载失败', `错误原因: error`);
      }
    });
  }

  submitForm() {
    if (formGroupInvalid(this.formGroup) || this.loading()) {
      return;
    }
    if (undefined == this.turnstileToken) {
      this.notification.error('安全组件加载失败', '请刷新页面重试');
      return;
    }
    if (turnstileIsExpired(Turnstile_Container)) {
      this.notification.error('安全验证已过期', '请重试');
      turnstileReset(Turnstile_Container);
      return;
    }
    const account = this.formGroup.getRawValue().account!;
    const password = this.formGroup.getRawValue().password!;
    const rememberMe = this.formGroup.getRawValue().rememberMe!;
    this.action(async () => {
      await this.userService.login(account, password, rememberMe, this.turnstileToken);
      const ref = this.notification.success('登录成功', '正在加载中, 请稍后...', {
        nzDuration: 0
      });
      this.turnstileToken = undefined;
      turnstileRemove(Turnstile_Container);
      this.router.navigateByUrl('/main');
      setTimeout(() => {
        this.notification.remove(ref.messageId);
      }, 1000);
    }, {
      error: e => {
        this.turnstileToken = undefined;
        turnstileReset(Turnstile_Container);
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
