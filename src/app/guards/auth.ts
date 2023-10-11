import {inject} from "@angular/core";
import {BackendUserService} from "../services/system/user/backend-user.service";
import {CanActivateFn, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

async function isOnline(userService: BackendUserService,
                        message: NzMessageService) {
  const router = inject(Router);
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

export const canActivate: CanActivateFn = async (route, __) => {
  const userService = inject(BackendUserService);
  const message = inject(NzMessageService);
  let result = await isOnline(userService, message);
  if (true !== result) {
    return result;
  }
  // 权限判断
  const permissions = route.data["permissions"] as string[] | undefined;
  if (null != permissions && permissions.length > 0) {
    const hasPermission = userService.hasPermission(permissions);
    if (!hasPermission) {
      message.warning('没有访问权限');
    }
    return hasPermission;
  }
  return true;
}
