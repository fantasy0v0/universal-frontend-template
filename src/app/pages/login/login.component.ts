import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {BingService} from "../../services/bing/bing.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UniversalUserService} from "../../services/universal-user/universal-user.service";
import {errorMessage, formGroupInvalid, sleep} from "../../services/common";
import {$loading} from "../../interceptors/my/my.interceptor";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';

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
export class LoginComponent implements OnInit {

  loading = $loading;

  formGroup: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private bingService: BingService,
    private userService: UniversalUserService,
    private notification: NzNotificationService,
    private router: Router) {
    const fb = inject(FormBuilder);
    this.formGroup = fb.group({
      account: [ null, [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ] ],
      password: [ null, [ Validators.required, Validators.minLength(6), Validators.maxLength(255) ] ],
      rememberMe: new FormControl(false)
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
    }
  }

}
