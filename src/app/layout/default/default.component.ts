import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {
  NzMenuDirective, NzMenuDividerDirective,
  NzMenuItemComponent,
  NzSubMenuComponent
} from "ng-zorro-antd/menu";
import {ChildrenOutletContexts, Router, RouterLink, RouterOutlet} from "@angular/router";
import {UserInfo} from "../../services/built-in/system/user/vo/UserInfo";
import {ErrorService} from "../../services/built-in/error/error.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {BackendUserService} from "../../services/built-in/system/user/backend-user.service";
import {SystemDialogService} from "../../services/built-in/dialog/system/system-dialog.service";
import {subRouteAnimation} from "../../animations/route";
import {SecuredDirective} from "../../directives/built-in/secured/secured.directive";
import {SettingDrawerComponent} from "./setting-drawer/setting-drawer.component";
import {
  LocalSettingService
} from "../../services/built-in/system/setting/local-setting.service";

@Component({
  selector: 'app-layout-default',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NzAvatarComponent,
    NzContentComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzHeaderComponent,
    NzIconDirective,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSiderComponent,
    NzSubMenuComponent,
    RouterLink,
    RouterOutlet,
    SecuredDirective,
    SettingDrawerComponent,
    NzMenuDividerDirective
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
  animations: [
    subRouteAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent implements OnInit {

  isCollapsed = signal(false);

  userInfo = signal<UserInfo | undefined>(undefined);

  private error = inject(ErrorService);

  private localSettingService = inject(LocalSettingService);

  constructor(private message: NzMessageService,
              private userService: BackendUserService,
              private dialogService: SystemDialogService,
              private router: Router,
              private contexts: ChildrenOutletContexts) { }

  ngOnInit(): void {
    this.userInfo.set(this.userService.getUserInfo());
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

  clear() {
    this.localSettingService.reset();
    this.message.success("清理成功");
  }
}
