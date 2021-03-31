import {NgModule} from '@angular/core';
import {TemplateLibraryComponent} from './template-library.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TemplateExperienceCardComponent} from './template-experience-card/template-experience-card.component';
import {TemplateCategoryCardComponent} from './template-category-card/template-category-card.component';
import {TemplateLibraryService} from './template-library.service';


@NgModule({
  declarations: [
    TemplateLibraryComponent,
    TemplateExperienceCardComponent,
    TemplateCategoryCardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplateLibraryComponent
      }
    ])
  ],
  exports: [
    TemplateLibraryComponent,
    TemplateExperienceCardComponent,
    TemplateCategoryCardComponent
  ],
  providers: [TemplateLibraryService]
})
export class TemplateLibraryModule { }
