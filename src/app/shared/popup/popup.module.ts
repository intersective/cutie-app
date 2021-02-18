import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { PopupService } from './popup.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionComponent } from './description/description.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  imports: [
    SharedModule,
    NgbTypeaheadModule
  ],
  providers: [
    PopupService
  ],
  declarations: [
    DescriptionComponent,
    TagsComponent
  ],
  exports: [
    DescriptionComponent,
    TagsComponent
  ],
  entryComponents: [
    DescriptionComponent,
    TagsComponent
  ]
})

export class PopupModule {

}
