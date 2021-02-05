import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { OverviewComponent } from './overview.component';
import { HeaderComponent } from './header/header.component';
import { StatCardComponent } from './stat-card/stat-card.component';

@NgModule({
  declarations: [
    OverviewComponent,
    HeaderComponent,
    StatCardComponent
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
