import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ApiPrefix, checkResult, Result} from "../util";
import {firstValueFrom, map, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {DateTime} from "luxon";

const wallpaper_date_key = 'wallpaper_date';
const wallpaper_default_images_key = 'wallpaper_default_images';

@Injectable({
  providedIn: 'root'
})
export class BingService {

  private http = inject(HttpClient);

  constructor() {
  }

  /**
   * 获取每日壁纸
   */
  wallpaper() {
    const date = DateTime.now().toFormat('yyyyMMdd');
    const defaultImage = this.getDefaultImage();
    if (!this.needUpdate(date, defaultImage)) {
      return Promise.resolve(defaultImage);
    }
    let observable = this.http.get<Result<string[]>>(`${ApiPrefix}/bing/wallpaper`, {
      params: {n: 1}
    }).pipe(
      map(result => {
        const images = checkResult(result);
        if (0 == images.length) {
          return defaultImage;
        } else {
          return images;
        }
      }),
      catchError(() => of(defaultImage)),
      map(images => {
        const image = images[0];
        this.updateDefaultImages(date, image);
        return image;
      })
    );
    return firstValueFrom(observable);
  }

  private getDefaultImage(): string {
    const defaultImages = localStorage.getItem(wallpaper_default_images_key);
    if (null == defaultImages) {
      return "/assets/wallpaper.jfif";
    } else {
      return JSON.parse(defaultImages);
    }
  }

  private needUpdate(date: string, image: string) {
    const localDate = localStorage.getItem(wallpaper_date_key);
    return null == localDate || date != localDate || !image.startsWith("http");
  }

  private updateDefaultImages(date: string, image: string) {
    localStorage.setItem(wallpaper_default_images_key, JSON.stringify(image));
    localStorage.setItem(wallpaper_date_key, date);
  }

  /**
   * 清理默认壁纸
   */
  public clear() {
    localStorage.removeItem(wallpaper_date_key);
  }
}
