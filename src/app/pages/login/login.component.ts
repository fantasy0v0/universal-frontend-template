import { Component, ElementRef, OnInit } from '@angular/core';
import { BingService } from "../../services/bing/bing.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { errorMessage, formGroupInvalid } from "@fantasy0v0/universal-frontend-utility";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { UniversalUserService } from "../../services/universal-user/universal-user.service";
import { timer } from "rxjs";

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
      password: [ null, [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ] ]
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
    this.loading = true;
    try {
      await this.userService.login(account, password);
      this.notification.success('登录成功', '正在加载中, 请稍后...', {
        nzDuration: 0
      });
      timer(300).subscribe(() => {
        this.router.navigateByUrl('/main');
      });
    } catch (e) {
      const message = errorMessage(e, "");
      this.notification.error('登录失败', message);
    } finally {
      this.loading = false;
    }
  }

}
