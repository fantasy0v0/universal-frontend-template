import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withViewTransitions
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgProgressHttpInterceptor } from 'src/ng-progress/ng-progress-http.interceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import icons from "./icons.config";
import {MyInterceptor} from "./interceptors/built-in/my/my.interceptor";

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      NzNotificationModule,
      NzMessageModule,
      NzModalModule,
      NzIconModule.forRoot(icons)
    ),
    {
      provide: NZ_I18N, useValue: zh_CN
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      // https://developer.chrome.com/docs/web-platform/view-transitions/
      withViewTransitions(),
      // 根据实际需要开启
      withHashLocation()
    ),
    {
      provide: HTTP_INTERCEPTORS, useClass: NgProgressHttpInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true
    }
  ]
};
