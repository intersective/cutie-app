import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';


const routes: Routes = [{
  path: '',
  component: MenuComponent,
  children: [
    { path: '', loadChildren: '../home/home.module#HomeModule' },
    { path: 'progress', loadChildren: '../progress/progress.module#ProgressModule' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
