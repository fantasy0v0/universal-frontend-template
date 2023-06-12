import {inject} from "@angular/core";
import {UniversalUserService} from "../services/universal-user/universal-user.service";
import {CanActivateFn, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

async function isOnline() {
  const userService = inject(UniversalUserService);
  const router = inject(Router);
  const message = inject(NzMessageService);

  const urlTree = router.parseUrl("/login");
  try {
    const result = await userService.online();
    if (result) {
      return true;
    }
    message.warning("登录信息已过期, 将跳转至登录页面...");
    return urlTree;
  } catch (e) {
    console.error(e);
    message.warning("网络异常, 请稍后重试");
    return false;
  }
}

export const canActivate: CanActivateFn = (_, __) => {
  return isOnline();
}
