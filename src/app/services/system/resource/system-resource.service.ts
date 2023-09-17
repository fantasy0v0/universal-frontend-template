import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SystemResourceVO} from "./vo/SystemResourceVO";
import {ApiPrefix, getResult, Result} from "../../util";
import {getAuthorizationHeader} from "../user/system-user.service";

@Injectable({
  providedIn: 'root'
})
export class SystemResourceService {

  private http = inject(HttpClient)

  /**
   * 查询系统内所有的资源
   */
  findAll() {
    let observable = this.http.get<Result<SystemResourceVO[]>>(`${ApiPrefix}/system/resource/findAll`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

}