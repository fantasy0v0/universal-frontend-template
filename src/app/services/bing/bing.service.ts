import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiPrefix, checkResult, Result } from "../common";
import { firstValueFrom, mergeMap, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BingService {

  constructor(private http: HttpClient) { }

  /**
   * 获取每日壁纸
   */
  wallpaper() {
    let observable = this.http.get<Result<string>>(`${ ApiPrefix }/bing/wallpaper`)
      .pipe(
        mergeMap(result => {
          const url = checkResult(result);
          return of(url);
        }),
        catchError(() => of("/assets/wallpaper.jfif")),
      );
    return firstValueFrom(observable);
  }
}
