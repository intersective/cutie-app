import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { PopupService } from './popup.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionComponent } from './description/description.component';
import { TagsComponent } from './tags/tags.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { DuplicateExperienceComponent } from './duplicate-experience/duplicate-experience.component';
import { DeleteTemplateComponent } from './delete-template/delete-template.component';
import { CreateTemplateComponent } from './create-template/create-template.component';

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
    DeleteTemplateComponent,
    CreateTemplateComponent,
  ],
  exports: [
    DescriptionComponent,
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
    DeleteTemplateComponent,
    CreateTemplateComponent,
  ],
  entryComponents: [
    DescriptionComponent,
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
    DeleteTemplateComponent,
    CreateTemplateComponent,
  ]
})

export class PopupModule {

}
