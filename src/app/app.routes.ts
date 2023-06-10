import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { WeclomeComponent } from './pages/main/children/weclome/weclome.component';
import { SystemRoleListComponent } from './pages/main/children/system/system-role-list/system-role-list.component';
import { SystemUserListComponent } from './pages/main/children/system/system-user-list/system-user-list.component';
import { canActivate } from './guards/auth';

export const routes: Routes = [{
  path: 'login',
  loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent)
}, {
  path: '',
  loadComponent: () => import('./pages/main/main.component').then(mod => mod.MainComponent),
  canActivate: [ canActivate ],
  canActivateChild: [ canActivate ],
  loadChildren: () => import('./pages/main/main.routes').then(mod => mod.routes)
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: ''
}];
