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

registerLocaleData(zh);
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import {NzIconModule} from "ng-zorro-antd/icon";

const icons: IconDefinition[] = [ UserOutline, LockOutline ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HasPermissionDirective
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
    NzMessageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
