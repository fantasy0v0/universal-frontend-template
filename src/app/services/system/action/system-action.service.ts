import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPrefix, getResult, Result} from "../../util";
import {SystemActionVO} from "./vo/SystemActionVO";
import {getAuthorizationHeader} from "../user/system-user.service";

@Injectable({
  providedIn: 'root'
})
export class SystemActionService {

  private http = inject(HttpClient)

  constructor() { }

  findAll() {
    let observable = this.http.get<Result<SystemActionVO[]>>(`${ApiPrefix}/system/action/findAll`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

}
