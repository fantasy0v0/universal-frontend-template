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
  SettingOutline, FundTwoTone, TeamOutline, PlusOutline,
  AppstoreOutline
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { WeclomeComponent } from './pages/main/children/weclome/weclome.component';
import { SystemRoleListComponent } from './pages/main/children/system/system-role-list/system-role-list.component';
import { SystemUserListComponent } from './pages/main/children/system/system-user-list/system-user-list.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import { SystemRoleUpdateComponent } from './dialogs/system/system-role-update/system-role-update.component';
import { SystemUserAddComponent } from './dialogs/system/system-user-add/system-user-add.component';

const icons: IconDefinition[] = [
  UserOutline, LockOutline,
  MenuUnfoldOutline, MenuFoldOutline,
  SettingOutline, FundTwoTone, TeamOutline, PlusOutline,
  AppstoreOutline
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HasPermissionDirective,
    WeclomeComponent,
    SystemRoleListComponent,
    SystemUserListComponent,
    ChangePasswordComponent,
    SystemRoleUpdateComponent,
    SystemUserAddComponent
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
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
    NzModalModule,
    NzSpaceModule,
    NzSelectModule,
    NzTableModule,
    NzBadgeModule,
    NzPopconfirmModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
