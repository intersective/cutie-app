import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { PopupService } from './popup.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionComponent } from './description/description.component';
import { TagsComponent } from './tags/tags.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { DuplicateExperienceComponent } from './duplicate-experience/duplicate-experience.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { TemplateInfoComponent } from './template-info/template-info.component';

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
    CreateTemplateComponent,
    TemplateInfoComponent,
  ],
  exports: [
    DescriptionComponent,
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
    CreateTemplateComponent,
    TemplateInfoComponent,
  ],
  entryComponents: [
    DescriptionComponent,
    TagsComponent,
    TagsViewComponent,
    DuplicateExperienceComponent,
    CreateTemplateComponent,
    TemplateInfoComponent,
  ]
})

export class PopupModule {

}
