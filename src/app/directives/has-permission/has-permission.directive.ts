import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SystemUserService } from "../../services/system/user/system-user.service";

@Directive({
  standalone: true,
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  constructor(private userService: SystemUserService,
              private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) { }

  /**
   * 允许的权限列表, 满足任意一个即可
   */
  @Input()
  set appHasPermission(permissions: string[]) {
    const result = this.userService.hasPermission(permissions);
    if (!result) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
