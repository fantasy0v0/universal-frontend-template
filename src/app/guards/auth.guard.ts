import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { UniversalUserService } from "../services/universal-user/universal-user.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UniversalUserService,
              private router: Router,
              private message: NzMessageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.isOnline();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.isOnline();
  }

  private async isOnline() {
    const urlTree = this.router.parseUrl("/login");
    try {
      const result = await this.userService.online();
      if (result) {
        return true;
      }
      this.message.warning("登录信息已过期, 将跳转至登录页面...");
      return urlTree;
    } catch (e) {
      console.error(e);
      this.message.warning("登录信息已过期, 将跳转至登录页面...");
      return urlTree;
    }
  }

}
