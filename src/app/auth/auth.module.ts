import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { OverviewComponent } from '../overview/overview.component';
import { StatCardComponent } from '../overview/stat-card/stat-card.component';
import { ExperienceCardComponent } from '../overview/experience-card/experience-card.component';

@NgModule({
  declarations: [
    AuthComponent,
    OverviewComponent,
    StatCardComponent,
    ExperienceCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
