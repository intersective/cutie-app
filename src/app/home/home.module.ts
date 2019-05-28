import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MetricPaneComponent } from './components/metric-pane/metric-pane.component';
import { MetricGridComponent } from './components/metric-grid/metric-grid.component';
import { ElsaBarComponent } from './components/elsa-bar/elsa-bar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProgressPopoverComponent } from './components/progress-popover/progress-popover.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    NgxDatatableModule
  ],
  declarations: [
    HomePage,
    MetricPaneComponent,
    MetricGridComponent,
    ElsaBarComponent,
    ProgressPopoverComponent
  ],
  entryComponents: [
    ProgressPopoverComponent
  ]
})
export class HomeModule {}
