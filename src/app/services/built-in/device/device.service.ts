import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ApiPrefix, getResult, Result} from "../util";

const KEY = "X-Device-Id";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private http = inject(HttpClient);

  constructor() { }

  /**
   * 当前的信息
   */
  current() {
    return localStorage.getItem(KEY);
  }

  /**
   * 创建一个设备
   */
  create() {
    const formData = new FormData();
    formData.set("resolution", `${window.outerWidth}x${window.outerHeight}`);
    const observable = this.http.post<Result<string>>(`${ApiPrefix}/device/create`, formData);
    return getResult(observable).then(id => {
      localStorage.setItem(KEY, id);
      return id;
    });
  }
}
