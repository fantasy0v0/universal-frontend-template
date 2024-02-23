import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {BackendUserService} from "../../../services/built-in/system/user/backend-user.service";

@Directive({
  selector: '[appSecuredAny]',
  standalone: true
})
export class SecuredAnyDirective {

  constructor(private userService: BackendUserService,
              private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) { }

  /**
   * 允许的权限列表, 满足任意一个即可
   */
  @Input()
  set appSecuredAny(permissions: string[]) {
    const result = this.userService.hasPermission(permissions);
    if (!result) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
