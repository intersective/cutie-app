import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { OverviewModule } from '../overview/overview.module';
import { ProgressModule } from '../progress/progress.module';
import { ChatModule } from '../chat/chat.module';
import {TemplateLibraryModule} from '../template-library/template-library.module';

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
    ChatModule,
    TemplateLibraryModule
  ]
})
export class AuthModule { }
