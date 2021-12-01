import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { TypeOfExperiencePage } from './type-of-experience/type-of-experience.page';
import { BriefsPage } from './briefs/briefs.page';
import { DetailsPage } from './details/details.page';
import { FinalPage } from './final/final.page';
import { PreBriefsPage } from './pre-briefs/pre-briefs.page';
import { TemplatePage } from './template/template.page';
import { TemplatesPage } from './templates/templates.page';
import { OnboardingHeaderComponent } from './onboarding-header/onboarding-header.component';
import { OnboardingStepsComponent } from './onboarding-steps/onboarding-steps.component';

@NgModule({
  declarations: [
    TypeOfExperiencePage,
    BriefsPage,
    DetailsPage,
    FinalPage,
    PreBriefsPage,
    TemplatePage,
    TemplatesPage,
    OnboardingHeaderComponent,
    OnboardingStepsComponent,
  ],
  imports: [
    SharedModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
