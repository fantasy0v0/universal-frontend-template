import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {subRouteAnimation} from "../../animations/route";
import {errorMessage} from "../../services/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {UniversalUserService} from "../../services/universal-user/universal-user.service";
import {DialogService} from "../../services/dialog/dialog.service";
import {UserInfo} from "../../services/universal-user/vo/UserInfo";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    subRouteAnimation
  ]
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  userInfo?: UserInfo;

  constructor(private message: NzMessageService,
              private userService: UniversalUserService,
              private dialogService: DialogService,
              private router: Router) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  async logout() {
    const ref = this.message.loading("退出中");
    try {
      await this.userService.logout();
      this.message.success("退出成功");
      this.router.navigateByUrl("/login");
    } catch (e) {
      const msg = errorMessage(e)
      this.message.error(msg);
    } finally {
      this.message.remove(ref.messageId);
    }

  }

  changePassword() {
    this.dialogService.changePassword();
  }

}
