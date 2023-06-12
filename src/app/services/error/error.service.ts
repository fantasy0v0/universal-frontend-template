import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {errorMessage} from "../common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private message: NzMessageService) {
    takeUntilDestroyed()
  }

  process(err: any, topic?: string) {
    console.debug(err);
    const msg = errorMessage(err, topic);
    this.message.error(msg);
  }

}
