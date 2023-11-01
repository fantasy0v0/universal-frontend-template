import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {debounceTime, Observable, Subject} from 'rxjs';
import { NgProgress } from './ng-progress.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgProgressHttpInterceptor implements HttpInterceptor {

  private enable = false;

  private _inProgressCount = 0;

  private subject = new Subject<void>();

  constructor(private nProgress: NgProgress) {
    this.subject.asObservable()
      .pipe(debounceTime(300))
      .subscribe(() => {
        if (this._inProgressCount === 0) {
          this.nProgress.done();
        }
      });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._inProgressCount++;
    this.nProgress.start();
    return next.handle(req).pipe(finalize(() => {
      this.nProgress.inc(.3 + .5 * Math.random());
      this._inProgressCount--;
      this.subject.next();
    }));
  }
}
