import {inject, Injectable} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {errorMessage, ResultError} from "../util";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private message = inject(NzMessageService)

  private router = inject(Router)

  process(err: any, topic?: string) {
    console.debug(err);
    const msg = errorMessage(err, topic);
    this.message.error(msg);
    if (err instanceof ResultError && "1" === err.code) {
      this.router.navigateByUrl("/login");
    }
  }

}
