import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {BackendUserService} from "../../services/system/user/backend-user.service";

@Directive({
  selector: '[appSecured]',
  standalone: true
})
export class SecuredDirective {

  constructor(private userService: BackendUserService,
              private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) { }

  /**
   * 允许的权限列表, 需要满足所有权限
   */
  @Input()
  set appSecured(permissions: string[]) {
    let result = false;
    const userInfo = this.userService.getUserInfo();
    if (null != userInfo) {
      result = true;
      for (const permission of permissions) {
        if (!userInfo.permissions.includes(permission)) {
          result = false;
          break;
        }
      }
    }
    if (result) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
