import {Routes} from "@angular/router";
import {WeclomeComponent} from "./children/weclome/weclome.component";
import {SystemRoleListComponent} from "./children/system/system-role-list/system-role-list.component";
import {SystemUserListComponent} from "./children/system/system-user-list/system-user-list.component";
import {SystemResourceListComponent} from "./children/system/system-resource-list/system-resource-list.component";

export const routes: Routes = [{
  path: 'welcome',
  component: WeclomeComponent
}, {
  path: 'system-role-list',
  component: SystemRoleListComponent
}, {
  path: 'system-user-list',
  component: SystemUserListComponent
}, {
  path: 'system-resource-list',
  component: SystemResourceListComponent
}];
