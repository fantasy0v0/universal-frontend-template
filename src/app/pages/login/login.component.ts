import { Component, ElementRef, OnInit } from '@angular/core';
import { BingService } from "../../services/bing/bing.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { UniversalUserService } from "../../services/universal-user/universal-user.service";
import { errorMessage, formGroupInvalid, sleep } from "../../services/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  loading = false;

  formGroup: FormGroup;

  constructor(
    fb: FormBuilder,
    private elementRef: ElementRef,
    private bingService: BingService,
    private userService: UniversalUserService,
    private notification: NzNotificationService,
    private router: Router) {
    this.formGroup = fb.group({
      account: [ null, [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ] ],
      password: [ null, [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ] ],
      rememberMe: [ false ]
    });
  }

  ngOnInit(): void {
    this.bingService.wallpaper().then(url => {
      this.elementRef.nativeElement.style.backgroundImage = `url(${ url })`;
    });
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const account = this.formGroup.get('account')!.value;
    const password = this.formGroup.get('password')!.value;
    const rememberMe = this.formGroup.get('rememberMe')!.value;
    this.loading = true;
    try {
      await this.userService.login(account, password, rememberMe);
      const ref = this.notification.success('登录成功', '正在加载中, 请稍后...', {
        nzDuration: 0
      });
      this.router.navigateByUrl('/main');
      await sleep(300);
      this.notification.remove(ref.messageId);
    } catch (e) {
      const message = errorMessage(e);
      this.notification.error('登录失败', message);
    } finally {
      this.loading = false;
    }
  }

}
