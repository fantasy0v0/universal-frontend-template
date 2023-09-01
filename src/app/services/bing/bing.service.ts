import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiPrefix, checkResult, Result } from "../util";
import {firstValueFrom, map, of} from "rxjs";
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
        map(result => {
          const images = checkResult(result);
          if (0 == images.length) {
            return this.defaultImages;
          } else {
            return images;
          }
        }),
        catchError(() => of(this.defaultImages)),
        map(images => {
          let index = Math.round(Math.random() * images.length);
          return images[index];
        })
      );
    return firstValueFrom(observable);
  }
}
