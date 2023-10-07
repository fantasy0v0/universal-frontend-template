import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiPrefix, getResult, Result} from "../../util";
import {BackendActionVO} from "./vo/BackendActionVO";
import {getAuthorizationHeader} from "../user/backend-user.service";

@Injectable({
  providedIn: 'root'
})
export class BackendActionService {

  private http = inject(HttpClient)

  constructor() { }

  findAll() {
    let observable = this.http.get<Result<BackendActionVO[]>>(`${ApiPrefix}/backend/action/findAll`, {
      headers: getAuthorizationHeader()
    });
    return getResult(observable);
  }

}
