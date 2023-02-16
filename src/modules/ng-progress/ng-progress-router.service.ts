import { Injectable } from '@angular/core';
import { NgProgress } from './ng-progress.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgProgressRouterService {

  private enable = false;

  private settingSubscription: Subscription;

  private routerSubscription: Subscription;

  constructor(private ngrogress: NgProgress, private router: Router) {
    this.settingSubscription = this.ngrogress.settings.subscribe(setting => {
      this.enable = setting.router;
    });

    this.routerSubscription = router.events.subscribe(event => {
      if (!this.enable) {
        return;
      }
      if (event instanceof NavigationStart) {
        this.ngrogress.start();
        return;
      }
      if (event instanceof NavigationCancel ||
      event instanceof NavigationEnd ||
      event instanceof NavigationError) {
        this.ngrogress.done();
      }
    });
    // 清理
    window.addEventListener('beforeunload', () => {
      this.settingSubscription.unsubscribe();
      this.routerSubscription.unsubscribe();
    });
  }
}
