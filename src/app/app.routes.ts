import {Routes} from '@angular/router';
import {canActivate} from './guards/auth';

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
