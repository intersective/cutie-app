import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionChartComponent } from './submission-chart.component';
import { ChartModule } from '@components/chart/chart.module';

@NgModule({
  declarations: [
    SubmissionChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    SubmissionChartComponent
  ]
})
export class SubmissionChartModule { }
