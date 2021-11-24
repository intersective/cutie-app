import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeOfExperiencePage } from './type-of-experience/type-of-experience.page';
import { DetailsPage } from './details/details.page';
import { TemplatesPage } from './templates/templates.page';
import { TemplatePage } from './template/template.page';
import { PreBriefsPage } from './pre-briefs/pre-briefs.page';
import { BriefsPage } from './briefs/briefs.page';
import { FinalPage } from './final/final.page';

const routes: Routes = [
  {
    path: '',
    component: TypeOfExperiencePage
  },
  {
    path: 'details/:type',
    component: DetailsPage
  },
  {
    path: 'templates',
    component: TemplatesPage
  },
  {
    path: 'template/:type',
    component: TemplatePage
  },
  {
    path: 'pre-brief',
    component: PreBriefsPage
  },
  {
    path: 'briefs',
    component: BriefsPage
  },
  {
    path: 'final',
    component: FinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
