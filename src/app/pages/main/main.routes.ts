import {Routes} from "@angular/router";
import {WeclomeComponent} from "./children/weclome/weclome.component";
import {BackendRoleListComponent} from "./children/system/backend-role-list/backend-role-list.component";
import {SystemUserListComponent} from "./children/system/system-user-list/system-user-list.component";
import {SystemResourceListComponent} from "./children/system/system-resource-list/system-resource-list.component";

export const routes: Routes = [{
  path: 'welcome',
  component: WeclomeComponent
}, {
  path: 'backend-role-list',
  component: BackendRoleListComponent
}, {
  path: 'system-user-list',
  component: SystemUserListComponent
}, {
  path: 'system-resource-list',
  component: SystemResourceListComponent
}];
