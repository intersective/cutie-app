import {NgModule} from '@angular/core';
import {TemplateLibraryComponent} from './template-library.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TemplateCardComponent} from './template-card/template-card.component';
import {TemplateCategoryCardComponent} from './template-category-card/template-category-card.component';
import {TemplateLibraryService} from './template-library.service';
import {TemplateLibraryHomeComponent} from './template-library-home/template-library-home.component';
import {BrowseCategoryComponent} from './browse-category/browse-category.component';
import {TemplateDetailsComponent} from './template-details/template-details.component';
import {ResourceDownloadCardComponent} from './resource-download-card/resource-download-card.component';
import {SearchResultsComponent} from './search-results/search-results.component';


@NgModule({
  declarations: [
    TemplateLibraryComponent,
    TemplateCardComponent,
    TemplateCategoryCardComponent,
    TemplateLibraryHomeComponent,
    BrowseCategoryComponent,
    TemplateDetailsComponent,
    ResourceDownloadCardComponent,
    SearchResultsComponent
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
            component: BrowseCategoryComponent
          },
          {
            path: 'view/:templateId',
            component: TemplateDetailsComponent
          },
          {
            path: 'search/:filter',
            component: SearchResultsComponent
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
    BrowseCategoryComponent,
    TemplateDetailsComponent,
    SearchResultsComponent
  ],
  providers: [TemplateLibraryService]
})
export class TemplateLibraryModule { }
