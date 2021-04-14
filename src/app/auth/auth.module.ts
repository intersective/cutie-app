import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { OverviewModule } from '../overview/overview.module';
import { ProgressModule } from '../progress/progress.module';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
    OverviewModule,
    ProgressModule,
    ChatModule
  ]
})
export class AuthModule { }
