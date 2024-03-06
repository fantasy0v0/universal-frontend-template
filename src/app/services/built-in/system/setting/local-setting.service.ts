import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {NzConfigService} from "ng-zorro-antd/core/config";

const KEY = "universal_backend_setting";

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface LocalSetting {

  /**
   * 主题
   */
  theme: ThemeMode

  /**
   * 主题色
   */
  color: string

}

const DefaultSetting: LocalSetting = {
  theme: 'light',
  color: '#1890FF'
};

/**
 * 本地设置服务类
 */
@Injectable({
  providedIn: 'root'
})
export class LocalSettingService {

  private setting$ = new BehaviorSubject<LocalSetting>(DefaultSetting);

  private nzConfigService = inject(NzConfigService);

  constructor() {
    console.log('初始化配置');
    const item = localStorage.getItem(KEY);
    if (null != item) {
      this.updateSetting(JSON.parse(item) as LocalSetting);
    }
  }

  /**
   * 还原回默认值
   */
  reset() {
    localStorage.removeItem(KEY);
    this.setting$.next(DefaultSetting);
  }

  /**
   * 更新设置
   * @param setting 设置
   */
  updateSetting(setting: Partial<LocalSetting>) {
    const value = {
      ...this.setting$.value,
      ...setting
    }
    this.setting$.next(value);
    // 持久化
    localStorage.setItem(KEY, JSON.stringify(value));
    if (undefined != setting.color) {
      this.nzConfigService.set('theme', {
        primaryColor: setting.color
      });
    }
  }

  /**
   * 订阅配置更新通知
   */
  setting() {
    return this.setting$;
  }

  /**
   * 订阅主题更新通知
   */
  theme() {
    return this.setting$.pipe(map(setting => {
      return setting.theme;
    }));
  }

  /**
   * 更新主题
   * @param mode mode
   */
  updateTheme(mode: ThemeMode) {
    this.updateSetting({
      theme: mode
    });
  }

  /**
   * 订阅主题色更新通知
   */
  color() {
    return this.setting$.pipe(map(setting => {
      return setting.color;
    }));
  }

  /**
   * 更新主题色
   * @param value 主题色
   */
  updateColor(value: string) {
    this.updateSetting({
      color: value
    });
  }

}
