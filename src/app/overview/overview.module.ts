import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { OverviewService } from './overview.service';

import { OverviewComponent } from './overview.component';
import { HeaderComponent } from './header/header.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { DescriptionComponent } from '@components/description/description.component';

@NgModule({
  declarations: [
    OverviewComponent,
    HeaderComponent,
    StatCardComponent,
    ExperienceCardComponent,
    DescriptionComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewComponent
      }
    ])
  ],
  exports: [
    OverviewComponent,
    StatCardComponent,
    ExperienceCardComponent,
    DescriptionComponent,
  ],
  providers: [OverviewService]
})
export class OverviewModule { }
