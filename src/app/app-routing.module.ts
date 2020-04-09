import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  },
  {
    path: 'progress-only',
    loadChildren: './progress/progress.module#ProgressModule'
  },
  {
    path: '',
    loadChildren: './menu/menu.module#MenuModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
