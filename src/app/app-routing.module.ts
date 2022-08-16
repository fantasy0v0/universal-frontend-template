import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./guards/auth/auth.guard";
import { MainComponent } from "./pages/main/main.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'main',
  component: MainComponent,
  canActivate: [ AuthGuard ],
  canActivateChild: [ AuthGuard ],
  children: []
}, {
  path: '**',
  pathMatch: 'full',
  redirectTo: 'main'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
