import { Component, OnInit, inject } from '@angular/core';
import {ChildrenOutletContexts, Router, RouterModule, RouterOutlet} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {subRouteAnimation} from "../../animations/route";
import {errorMessage} from "../../services/common";
import {NzMessageModule, NzMessageService} from "ng-zorro-antd/message";
import {UniversalUserService} from "../../services/universal-user/universal-user.service";
import {UserInfo} from "../../services/universal-user/vo/UserInfo";
import {SystemDialogService} from "../../services/dialog/system/system-dialog.service";
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from 'src/app/directives/has-permission/has-permission.directive';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    subRouteAnimation
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NzLayoutModule,
    NzMessageModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule,
    HasPermissionDirective
  ]
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  userInfo?: UserInfo;

  private error = inject(ErrorService);

  constructor(private message: NzMessageService,
              private userService: UniversalUserService,
              private dialogService: SystemDialogService,
              private router: Router,
              private contexts: ChildrenOutletContexts) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
  }

  prepareRoute() {
    return this.contexts.getContext('primary')?.route?.snapshot.toString();
  }

  async logout() {
    const ref = this.message.loading("退出中");
    try {
      await this.userService.logout();
      this.message.success("退出成功");
      this.router.navigateByUrl("/login");
    } catch (e) {
      this.error.process(e);
    } finally {
      this.message.remove(ref.messageId);
    }

  }

  changePassword() {
    this.dialogService.changePassword();
  }

}
