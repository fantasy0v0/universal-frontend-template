import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {BackendUserService} from "../../../services/built-in/system/user/backend-user.service";

@Directive({
  selector: '[appIsAuthenticated]',
  standalone: true
})
export class IsAuthenticatedDirective {

  constructor(private userService: BackendUserService,
              private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
    const userInfo = this.userService.getUserInfo();
    if (!userInfo) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
