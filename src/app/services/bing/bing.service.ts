import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiPrefix, checkResult, Result } from "../common";
import { firstValueFrom, mergeMap, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BingService {

  /**
   * 默认壁纸
   * @private
   */
  private defaultImages = [
    "/assets/wallpaper.jfif"
  ];

  constructor(private http: HttpClient) { }

  /**
   * 获取每日壁纸
   */
  wallpaper() {
    let observable = this.http.get<Result<string[]>>(`${ ApiPrefix }/bing/wallpaper`)
      .pipe(
        mergeMap(result => {
          const images = checkResult(result);
          if (0 == images.length) {
            return of(this.defaultImages);
          } else {
            return of(images);
          }
        }),
        catchError(() => of(this.defaultImages)),
        mergeMap(images => {
          let index = Math.round(Math.random() * images.length);
          return of(images[index]);
        })
      );
    return firstValueFrom(observable);
  }
}
