import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewComponent
      }
    ])
  ]
})
export class OverviewModule { }
