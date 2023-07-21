import {Routes} from "@angular/router";
import {WeclomeComponent} from "./children/weclome/weclome.component";
import {SystemRoleListComponent} from "./children/system/system-role-list/system-role-list.component";
import {SystemUserListComponent} from "./children/system/system-user-list/system-user-list.component";

export const routes: Routes = [{
  path: '',
  component: WeclomeComponent
}, {
  path: 'system-role-list',
  component: SystemRoleListComponent,
  data: {

  }
}, {
  path: 'system-user-list',
  component: SystemUserListComponent
}];
