import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { PopupService } from './popup.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionComponent } from './description/description.component';
import { TagsComponent } from './tags/tags.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { DuplicateExperienceComponent } from './duplicate-experience/duplicate-experience.component';

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
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
  ],
  exports: [
    DescriptionComponent,
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
  ],
  entryComponents: [
    DescriptionComponent,
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
  ]
})

export class PopupModule {

}
