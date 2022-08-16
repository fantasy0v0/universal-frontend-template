import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { HasPermissionDirective } from './directives/has-permission/has-permission.directive';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';

registerLocaleData(zh);
import {
  UserOutline, LockOutline,
  MenuUnfoldOutline, MenuFoldOutline,
  SettingOutline, FundTwoTone, TeamOutline
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { WeclomeComponent } from './pages/main/children/weclome/weclome.component';
import { SystemRoleListComponent } from './pages/main/children/system/system-role-list/system-role-list.component';
import { SystemUserListComponent } from './pages/main/children/system/system-user-list/system-user-list.component';

const icons: IconDefinition[] = [
  UserOutline, LockOutline,
  MenuUnfoldOutline, MenuFoldOutline,
  SettingOutline, FundTwoTone, TeamOutline
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HasPermissionDirective,
    WeclomeComponent,
    SystemRoleListComponent,
    SystemUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzNotificationModule,
    NzCheckboxModule,
    NzIconModule.forRoot(icons),
    NzMessageModule,
    NzLayoutModule,
    NzMenuModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
