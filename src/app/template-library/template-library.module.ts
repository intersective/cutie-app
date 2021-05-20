import {NgModule} from '@angular/core';
import {TemplateLibraryComponent} from './template-library.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TemplateCardComponent} from './template-card/template-card.component';
import {TemplateCategoryCardComponent} from './template-category-card/template-category-card.component';
import {TemplateLibraryService} from './template-library.service';
import {TemplateLibraryHomeComponent} from './template-library-home/template-library-home.component';
import {TemplateDetailsComponent} from './template-details/template-details.component';
import {ResourceDownloadCardComponent} from './resource-download-card/resource-download-card.component';
import {BrowseTemplatesComponent} from './browse-templates/browse-templates.component';
import {EmptyResultsComponent} from './empty-results/empty-results.component';


@NgModule({
  declarations: [
    TemplateLibraryComponent,
    TemplateCardComponent,
    TemplateCategoryCardComponent,
    TemplateLibraryHomeComponent,
    TemplateDetailsComponent,
    ResourceDownloadCardComponent,
    BrowseTemplatesComponent,
    EmptyResultsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplateLibraryComponent,
        children: [
          {
            path: '',
            component: TemplateLibraryHomeComponent
          },
          {
            path: ':categoryName',
            component: BrowseTemplatesComponent
          },
          {
            path: 'view/:templateId',
            component: TemplateDetailsComponent
          },
          {
            path: 'search/:filter',
            component: BrowseTemplatesComponent
          }
        ]
      },
    ])
  ],
  exports: [
    TemplateLibraryComponent,
    TemplateCardComponent,
    TemplateCategoryCardComponent,
    TemplateLibraryHomeComponent,
    TemplateDetailsComponent,
    BrowseTemplatesComponent
  ],
  providers: [TemplateLibraryService]
})
export class TemplateLibraryModule { }
