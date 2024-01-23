import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {ErrorService} from "../services/error/error.service";
import {NgProgress} from "../../ng-progress/ng-progress.service";

type Action = () => void | Promise<void>;

type StopLoadingConfig = {
  /**
   * 延迟时间, 默认300毫秒
   */
  delay?: number,

  /**
   * 取消加载后需要进行的操作
   */
  after?: Action
}

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

  /**
   * 加载队列
   * @private
   */
  private loadingQueue = 0;

  protected nProgress = inject(NgProgress);

  protected error = inject(ErrorService);

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  /**
   * 开启加载状态
   * @param before 开始加载后的初始化操作
   */
  protected startLoading(before?: Action): void | Promise<void> {
    this.loadingQueue += 1;
    this.loading.set(true);
    this.nProgress.start();
    const result = before?.apply(this);
    if (result instanceof Promise) {
      return result;
    }
  }

  /**
   * 停止加载状态
   * @param config
   */
  protected stopLoading(config?: StopLoadingConfig) {
    const delay = config?.delay ? config?.delay : 300;
    const action = config?.after;
    setTimeout(() => {
      this.loadingQueue -= 1;
      if (this.loadingQueue <= 0) {
        this.loadingQueue = 0;
        this.loading.set(false);
      }
      this.nProgress.done(true);
      action?.apply(this);
    }, delay);
  }

  protected async action(action: Action, config?: { before?: Action, after?: Action, done?: Action, error?: Action, finally?: Action }) {
    await this.startLoading(config?.before);
    try {
      action();
      if (config?.done) {
        config.done();
      }
    } catch (e) {
      this.error.process(e);
      if (config?.error) {
        config.error();
      }
    } finally {
      this.stopLoading({ after: config?.finally })
    }
  }

}
