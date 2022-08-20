import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./guards/auth/auth.guard";
import { MainComponent } from "./pages/main/main.component";
import {WeclomeComponent} from "./pages/main/children/weclome/weclome.component";
import {SystemRoleListComponent} from "./pages/main/children/system/system-role-list/system-role-list.component";
import {SystemUserListComponent} from "./pages/main/children/system/system-user-list/system-user-list.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: MainComponent,
  canActivate: [ AuthGuard ],
  canActivateChild: [ AuthGuard ],
  children: [{
    path: '',
    component: WeclomeComponent
  }, {
    path: 'system-role-list',
    component: SystemRoleListComponent
  }, {
    path: 'system-user-list',
    component: SystemUserListComponent
  }]
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
