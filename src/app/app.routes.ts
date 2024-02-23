import {Routes} from '@angular/router';
import {canActivate} from './guards/built-in/auth';

export const routes: Routes = [{
  path: 'login',
  loadComponent: () => import('./pages/built-in/login/login.component').then(mod => mod.LoginComponent)
}, {
  path: '',
  loadComponent: () => import('./layout/default/default.component').then(mod => mod.DefaultComponent),
  canActivate: [ canActivate ],
  canActivateChild: [ canActivate ],
  loadChildren: () => import('./pages/route.config').then(mod => mod.routes)
}, {
  path: '**', redirectTo: ''
}];
