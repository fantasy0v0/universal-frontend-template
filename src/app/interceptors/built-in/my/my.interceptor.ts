import {inject, signal} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from "rxjs/operators";
import {DeviceService} from "../../../services/built-in/device/device.service";

/**
 * @deprecated 全局共享加载状态效果并不理想
 */
export const $loading = signal(false);

// @Injectable()
export class MyInterceptor implements HttpInterceptor {

  private deviceService = inject(DeviceService);

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    $loading.set(true);
    const deviceId = this.deviceService.current();
    let newReq;
    if (null != deviceId) {
      newReq = req.clone({
        headers: req.headers.set("X-Device-Id", deviceId)
      });
    } else {
      newReq = req;
    }
    return next.handle(newReq).pipe(
      finalize(() => {
        setTimeout(() => {
          $loading.set(false);
        }, 180);
      })
    );
  }
}
