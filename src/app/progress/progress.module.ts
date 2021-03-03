import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProgressTableModule } from '@components/progress-table/progress-table.module';
import { ProgressComponent } from './progress.component';

@NgModule({
  declarations: [ProgressComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProgressComponent
      }
    ]),
    ProgressTableModule,
  ],
  exports: [ProgressComponent]
})
export class ProgressModule { }
