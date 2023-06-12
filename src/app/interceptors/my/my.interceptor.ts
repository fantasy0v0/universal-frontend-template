import {Injectable, signal} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from "rxjs/operators";

export const $loading = signal(false);

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    $loading.set(true);
    return next.handle(req).pipe(finalize(() => {
      setTimeout(() => {
        $loading.set(false);
      }, 180);
    }));
  }
}
