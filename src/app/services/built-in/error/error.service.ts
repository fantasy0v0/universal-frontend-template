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
    const msg = errorMessage(err);
    // 会话失效处理, 或者弹出登陆对话框?
    // TODO 考虑将登录页面改造成组件的形式
    if (err instanceof ResultError && "1" === err.code) {
      this.modal.confirm({
        nzTitle: '会话已失效',
        nzContent: '是否需要重新登录?',
        nzOnOk: () => {
          this.router.navigateByUrl("/login");
        }
      });
    } else {
      this.modal.error({
        nzTitle: topic ? topic : '操作失败',
        nzContent: msg
      });
    }
  }

}
