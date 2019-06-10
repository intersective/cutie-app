import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MetricPaneComponent } from '@components/metric-pane/metric-pane.component';
import { MetricGridComponent } from '@components/metric-grid/metric-grid.component';
import { ElsaBarComponent } from '@components/elsa-bar/elsa-bar.component';
import { ElsaGhostComponent } from '@components/elsa-ghost/elsa-ghost.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [
    HomeComponent,
    MetricPaneComponent,
    MetricGridComponent,
    ElsaBarComponent,
    ElsaGhostComponent
  ]
})
export class HomeModule {}
