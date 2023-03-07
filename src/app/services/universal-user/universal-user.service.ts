import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Session} from "./vo/Session";
import {ApiPrefix, getResult, Paging, PagingResult, Result} from "../common";
import {UserInfo} from "./vo/UserInfo";
import {SystemUserVO} from "./vo/SystemUserVO";
import {SystemUserAddRequest} from "./vo/SystemUserAddRequest";
import { DateTime } from "luxon";

const SessionKey = "universal_session";

@Injectable({
  providedIn: 'root'
})
export class UniversalUserService {

  constructor(private http: HttpClient) {
  }

  /**
   * 登录接口
   * @param account 账号
   * @param password 密码
   * @param rememberMe 是否记住我
   */
  login(account: string, password: string, rememberMe: boolean) {
    let observable = this.http.post<Result<Session>>(`${ApiPrefix}/user/login`, {
      account, password, rememberMe, type: 0
    });
    return getResult(observable, data => {
      const session = data!;
      saveSession(session);
      return mapUserInfo(session);
    });
  }

  /**
   * 判断当前是否处于在线状态
   */
  online() {
    let session = getSession();
    if (null == session || expired(session)) {
      return Promise.resolve(false);
    }
    let observable = this.http.get<Result<boolean>>(`${ApiPrefix}/user/online`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable, data => data!);
  }

  /**
   * 用户退出
   */
  logout() {
    let observable = this.http.put<Result<void>>(`${ApiPrefix}/user/logout`, null, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable, () => {
      localStorage.removeItem(SessionKey);
      return;
    });
  }

  /**
   * 判断用户是否有权限要求内的任意一个权限
   * @param permissions 要求的权限
   */
  hasPermission(permissions: string[]): boolean {
    const userInfo = this.getUserInfo();
    if (null == userInfo) {
      return false;
    }
    for (const permission of permissions) {
      if (userInfo.permissions.includes(permission)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 修改当前用户密码
   * @param currentPassword 当前密码
   * @param newPassword 新的密码,
   * @param type 认证方式, 默认为0
   */
  changePassword(currentPassword: string, newPassword: string, type: number = 0) {
    let observable = this.http.put<Result<void>>(`${ApiPrefix}/user/changePassword`, {
      currentPassword, newPassword, type
    }, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable, () => null);
  }

  /**
   * 获取当前用户信息
   */
  getUserInfo(): UserInfo | undefined {
    let session = getSession();
    if (undefined === session) {
      return undefined;
    }
    return mapUserInfo(session);
  }

  /**
   * 查询系统内所有用户
   * @param paging 分页条件
   * @param name 按名称查询
   * @param role 按角色查询
   */
  findAll(paging?: Paging, name?: string, role?: number) {
    let params: HttpParams;
    if (null != paging) {
      params = paging.toHttpParams();
    } else {
      params = new HttpParams();
    }
    if (null != name && name.length > 0) {
      params = params.append("name", name);
    }
    if (null != role) {
      params = params.append("role", role);
    }
    let observable = this.http.get<Result<PagingResult<SystemUserVO>>>(`${ApiPrefix}/system/user/findAll`, {
      params, headers: getAuthorizationHeader()
    });
    return getResult(observable, data => data!);
  }

  /**
   * 重置指定用户的密码
   * @param userId 用户编号
   * @param type 认证方式
   */
  restPassword(userId: number, type: number) {
    let params = new HttpParams().append("type", type);
    let observable = this.http.post<Result<string>>(`${ApiPrefix}/system/user/${userId}/resetPassword`, null, {
      params, headers: getAuthorizationHeader()
    });
    return getResult(observable, data => data!);
  }

  /**
   * 将用户状态修改为禁用状态
   * @param userId 用户编号
   */
  disable(userId: number) {
    let observable = this.http.put<Result<void>>(`${ApiPrefix}/system/user/${userId}/disable`, null, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable, data => data);
  }

  /**
   * 将用户状态修改为正常状态
   * @param userId 用户编号
   */
  enable(userId: number) {
    let observable = this.http.put<Result<void>>(`${ApiPrefix}/system/user/${userId}/enable`, null, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable, data => data);
  }

  /**
   * 添加一名用户
   * @param request 请求
   */
  addUser(request: SystemUserAddRequest) {
    let observable = this.http.post<Result<void>>(`${ApiPrefix}/system/user`, request, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable, data => data);
  }

}

/**
 * 保存session信息
 * @param session session
 */
function saveSession(session: Session) {
  let data = JSON.stringify(session);
  data = btoa(encodeURIComponent(data));
  localStorage.setItem(SessionKey, data);
}

/**
 * 获取保存的session信息
 */
function getSession(): Session | undefined {
  let item = localStorage.getItem(SessionKey);
  if (null == item) {
    return undefined;
  }
  let data = atob(item);
  data = decodeURIComponent(data);
  return JSON.parse(data) as Session;
}

/**
 * 是否已经到期
 */
function expired(session: Session) {
  let d1 = DateTime.fromISO(session.expiration)
  return d1 < DateTime.now();
}

/**
 * 生成认证消息头
 */
export function getAuthorizationHeader() {
  let session = getSession();
  return {
    Authorization: session ? session.token : ""
  };
}

function mapUserInfo(session: Session): UserInfo {
  return {
    id: session.user.id,
    name: session.user.name,
    role: session.role,
    permissions: session.permissions
  }
}
