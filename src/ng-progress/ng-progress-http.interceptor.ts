import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgProgress } from './ng-progress.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgProgressHttpInterceptor implements HttpInterceptor {

  private enable = false;

  private _inProgressCount = 0;

  constructor(private nProgress: NgProgress) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._inProgressCount++;

    this.nProgress.start();
    return next.handle(req).pipe(finalize(() => {
      this._inProgressCount--;
      if (this._inProgressCount === 0) {
        this.nProgress.done()
      }
    }));
  }
}
