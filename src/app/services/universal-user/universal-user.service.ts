import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoginResponse} from "./vo/LoginResponse";
import {ApiPrefix, checkResult, errorToException, Paging, PagingResult, Result} from "../common";
import {firstValueFrom, mergeMap, of} from "rxjs";
import {UserInfo} from "./vo/UserInfo";
import {Session} from "./vo/Session";
import {SystemUserVO} from "./vo/SystemUserVO";

const SessionKey = "universal_session";

const UserKey = "universal_user";

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
    let observable = this.http.post<Result<LoginResponse>>(`${ApiPrefix}/user/login`, {
      account, password, rememberMe, type: 0
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data!);
    }), mergeMap(rsp => {
      saveUserInfo(rsp);
      saveSession(rsp);
      return of(null);
    }));
    return firstValueFrom(observable);
  }

  /**
   * 判断当前是否处于在线状态
   */
  online() {
    let session = getSession();
    if (null == session || session.expired()) {
      return Promise.resolve(false);
    }
    let observable = this.http.get<Result<boolean>>(`${ApiPrefix}/user/online`, {
      headers: getAuthorizationHeader()
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data);
    }));
    return firstValueFrom(observable);
  }

  /**
   * 用户退出
   */
  logout() {
    let observable = this.http.put<Result<void>>(`${ApiPrefix}/user/logout`, null, {
      headers: getAuthorizationHeader()
    }).pipe(errorToException(), mergeMap(result => {
      checkResult(result);
      localStorage.removeItem(SessionKey);
      localStorage.removeItem(UserKey);
      return of(null)
    }));
    return firstValueFrom(observable);
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
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data);
    }));
    return firstValueFrom(observable);
  }

  /**
   * 获取当前用户信息
   */
  getUserInfo() {
    let item = localStorage.getItem(UserKey);
    if (null == item) {
      return undefined;
    }
    return JSON.parse(item) as UserInfo;
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
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data!);
    }));
    return firstValueFrom(observable);
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
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data!);
    }));
    return firstValueFrom(observable);
  }

  /**
   * 禁用指定用户的认证方式
   * @param userId 用户编号
   * @param type 认证方式
   */
  disable(userId: number, type: number) {
    let params = new HttpParams().append("type", type);
    let observable = this.http.put<Result<void>>(`${ApiPrefix}/system/user/${userId}/disable`, null, {
      params, headers: getAuthorizationHeader()
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data);
    }));
    return firstValueFrom(observable);
  }

}

/**
 * 保存session信息
 * @param rsp 登录响应
 */
function saveSession(rsp: LoginResponse) {
  let session: Session = new Session();
  session.token = rsp.token;
  session.expiration = rsp.expiration;
  localStorage.setItem(SessionKey, JSON.stringify(session));
}

/**
 * 获取保存的session信息
 */
function getSession() {
  let item = localStorage.getItem(SessionKey);
  if (null == item) {
    return null;
  }
  const data = JSON.parse(item);
  const session = new Session();
  session.token = data.token;
  session.expiration = data.expiration;
  return session;
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

/**
 * 保存用户信息
 * @param rsp 登录相应
 */
function saveUserInfo(rsp: LoginResponse) {
  let userInfo: UserInfo = {
    id: rsp.id,
    name: rsp.name,
    role: rsp.role,
    permissions: rsp.permissions
  }
  localStorage.setItem(UserKey, JSON.stringify(userInfo));
}
