import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {ErrorService} from "../services/error/error.service";

/**
 * 封装一些组件的常用操作
 */
@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy {

  /**
   * 加载状态
   */
  loading = signal(false);

  protected error = inject(ErrorService);

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  /**
   * 开启加载状态
   */
  startLoading() {
    this.loading.set(true);
  }

  /**
   * 停止加载状态
   * @param timeout 延迟时间, 默认300毫秒
   */
  stopLoading(timeout: number = 300) {
    setTimeout(() => {
      this.loading.set(false);
    }, timeout);
  }

}
