import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendResourceVO} from "./vo/BackendResourceVO";
import {ApiPrefix, getResult, Result} from "../../util";
import {getAuthorizationHeader} from "../user/backend-user.service";

@Injectable({
  providedIn: 'root'
})
export class BackendResourceService {

  private http = inject(HttpClient)

  /**
   * 查询系统内所有的资源
   */
  findAll() {
    let observable = this.http.get<Result<BackendResourceVO[]>>(`${ApiPrefix}/backend/resource/findAll`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

  /**
   * 删除资源
   * @param id 资源编号
   */
  deleteById(id: number) {
    let observable = this.http.delete<Result<void>>(`${ApiPrefix}/backend/resource/${id}`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

}
