import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {ErrorService} from "../services/error/error.service";
import {NgProgress} from "../../ng-progress/ng-progress.service";

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
  protected loading = signal(false);

  protected nProgress = inject(NgProgress);

  protected error = inject(ErrorService);

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  /**
   * 开启加载状态
   */
  protected startLoading() {
    this.loading.set(true);
    this.nProgress.start();
  }

  /**
   * 停止加载状态
   * @param timeout 延迟时间, 默认300毫秒
   */
  protected stopLoading(timeout: number = 300) {
    setTimeout(() => {
      this.loading.set(false);
      this.nProgress.done(true);
    }, timeout);
  }

}
