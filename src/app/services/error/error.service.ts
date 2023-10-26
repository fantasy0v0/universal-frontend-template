import {inject, Injectable} from '@angular/core';
import {errorMessage, ResultError} from "../util";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private modal = inject(NzModalService)

  private router = inject(Router)

  process(err: any, topic?: string) {
    console.debug(err);
    const msg = errorMessage(err, topic);
    this.modal.error({
      nzTitle: '操作失败',
      nzContent: msg
    });
    if (err instanceof ResultError && "1" === err.code) {
      this.router.navigateByUrl("/login");
    }
  }

}
