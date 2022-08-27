import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiPrefix, checkResult, errorToException, Paging, PagingResult, Result} from "../common";
import {SimpleDataVO} from "../vo/SimpleDataVO";
import {getAuthorizationHeader} from "../universal-user/universal-user.service";
import {firstValueFrom, mergeMap, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniversalRoleService {

  constructor(private http: HttpClient) { }

  /**
   * 查询角色列表
   * @param paging 分页参数
   * @param name 按名称查询
   */
  findAll(paging?: Paging, name?: string) {
    let params: HttpParams;
    if (null != paging) {
      params = paging.toHttpParams();
    } else {
      params = new HttpParams();
    }
    if (null != name && name.length > 0) {
      params = params.append("name", name);
    }
    let observable = this.http.get<Result<PagingResult<SimpleDataVO>>>(`${ApiPrefix}/system/role/findAll`, {
      params, headers: getAuthorizationHeader()
    }).pipe(errorToException(), mergeMap(result => {
      const data = checkResult(result);
      return of(data!);
    }));
    return firstValueFrom(observable);
  }

  /**
   * 新增或更新角色
   * @param role 角色信息
   */
  saveOrUpdate(role: SimpleDataVO) {
    let observable = this.http.post<Result<void>>(`${ApiPrefix}/system/role`, role, {
      headers: getAuthorizationHeader()
    }).pipe(errorToException(), mergeMap(result => {
      checkResult(result);
      return of(null);
    }));
    return firstValueFrom(observable);
  }

  /**
   * 删除角色
   * @param id 角色编号
   */
  deleteById(id: number) {
    let observable = this.http.delete<Result<void>>(`${ApiPrefix}/system/role/${id}`, {
      headers: getAuthorizationHeader()
    }).pipe(errorToException(), mergeMap(result => {
      checkResult(result);
      return of(null);
    }));
    return firstValueFrom(observable);
  }

}
