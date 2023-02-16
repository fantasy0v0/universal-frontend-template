import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressComponent } from './component/ng-progress.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressHttpInterceptor } from './ng-progress-http.interceptor';
import { NgProgressRouterService } from './ng-progress-router.service';

@NgModule({
  declarations: [NgProgressComponent],
  exports: [
    NgProgressComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: NgProgressHttpInterceptor, multi: true
  }]
})
export class NgProgressModule {

  constructor(private ngrogressRouterService: NgProgressRouterService) {}
}
