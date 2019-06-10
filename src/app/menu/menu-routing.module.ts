import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { AuthGuard } from '@app/auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: MenuComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: 'dashboard',
      loadChildren: '../home/home.module#HomeModule'
    },
    {
      path: 'progress',
      loadChildren: '../progress/progress.module#ProgressModule'
    },
    {
      path: '',
      redirectTo: 'dashboard'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
