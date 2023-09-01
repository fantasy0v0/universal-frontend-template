import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiPrefix, getResult, Null, Result} from "../../util";
import {SimpleDataVO} from "../../vo/SimpleDataVO";
import {getAuthorizationHeader} from "../user/system-user.service";

@Injectable({
  providedIn: 'root'
})
export class SystemRoleService {

  constructor(private http: HttpClient) { }

  /**
   * 查询角色列表
   * @param name 按名称查询
   */
  findAll(name: Null<string>) {
    let params = new HttpParams();
    if (null != name && name.length > 0) {
      params = params.append("name", name);
    }
    let observable = this.http.get<Result<SimpleDataVO[]>>(`${ApiPrefix}/system/role/findAll`, {
      params, headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

  /**
   * 新增或更新角色
   * @param role 角色信息
   */
  saveOrUpdate(role: SimpleDataVO) {
    let observable = this.http.post<Result<void>>(`${ApiPrefix}/system/role`, role, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

  /**
   * 删除角色
   * @param id 角色编号
   */
  deleteById(id: number) {
    let observable = this.http.delete<Result<void>>(`${ApiPrefix}/system/role/${id}`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

}
