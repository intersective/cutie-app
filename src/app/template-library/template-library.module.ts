import {NgModule} from '@angular/core';
import {TemplateLibraryComponent} from './template-library.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TemplateCardComponent} from './template-card/template-card.component';
import {TemplateCategoryCardComponent} from './template-category-card/template-category-card.component';
import {TemplateLibraryService} from './template-library.service';


@NgModule({
  declarations: [
    TemplateLibraryComponent,
    TemplateCardComponent,
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
    TemplateCardComponent,
    TemplateCategoryCardComponent
  ],
  providers: [TemplateLibraryService]
})
export class TemplateLibraryModule { }
