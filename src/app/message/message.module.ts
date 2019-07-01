import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MessageComponent } from './message.component';


@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MessageComponent
      }
    ]),
  ]
})
export class MessageModule { }
