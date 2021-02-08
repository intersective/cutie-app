import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { DescriptionComponent } from './description/description.component';
import { PopupService } from './popup.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    PopupService
  ],
  declarations: [
    DescriptionComponent,
  ],
  exports: [
    DescriptionComponent
  ],
  entryComponents: [
    DescriptionComponent,
  ]
})

export class PopupModule {

}
