import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MetricPaneComponent } from '@components/metric-pane/metric-pane.component';
import { MetricGridComponent } from '@components/metric-grid/metric-grid.component';
import { SubmissionChartModule } from '@components/submission-chart/submission-chart.module';
import { ElsaTodoListModule } from '@components/elsa-todo-list/elsa-todo-list.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    SubmissionChartModule,
    ElsaTodoListModule
  ],
  declarations: [
    HomeComponent,
    MetricPaneComponent,
    MetricGridComponent,
  ]
})
export class HomeModule {}
