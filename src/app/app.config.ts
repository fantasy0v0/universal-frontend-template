import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter, withDebugTracing } from '@angular/router';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { NgProgressHttpInterceptor } from 'src/ng-progress/ng-progress-http.interceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import {IconDefinition} from '@ant-design/icons-angular';
import {
  UserOutline, LockOutline,
  MenuUnfoldOutline, MenuFoldOutline,
  SettingOutline, FundTwoTone, TeamOutline, PlusOutline,
  AppstoreOutline
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(zh);
const icons: IconDefinition[] = [
  UserOutline, LockOutline,
  MenuUnfoldOutline, MenuFoldOutline,
  SettingOutline, FundTwoTone, TeamOutline, PlusOutline,
  AppstoreOutline
];

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
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes, withDebugTracing()),
    {
      provide: HTTP_INTERCEPTORS, useClass: NgProgressHttpInterceptor, multi: true
    }
  ]
};
