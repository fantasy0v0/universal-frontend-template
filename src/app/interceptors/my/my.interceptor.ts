import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {finalize} from "rxjs/operators";

class GlobalLoading {
  private subject = new Subject<boolean>()

  next(value: boolean) {
    this.subject.next(value);
  }

  toObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }
}

export const $loading = new GlobalLoading();

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    $loading.next(true);
    return next.handle(req).pipe(finalize(() => {
      setTimeout(() => {
        $loading.next(false);
      }, 100);
    }));
  }
}
