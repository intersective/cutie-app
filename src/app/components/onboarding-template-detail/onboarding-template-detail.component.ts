import { Component, Input, OnInit } from '@angular/core';
import { Template } from '@app/onboarding/onboarding.service';

@Component({
  selector: 'app-onboarding-template-detail',
  templateUrl: './onboarding-template-detail.component.html',
  styleUrls: ['./onboarding-template-detail.component.scss'],
})
export class OnboardingTemplateDetailComponent implements OnInit {

  @Input() template: Template;
  projectIndex = 0;

  constructor() { }

  ngOnInit() {}

  get briefsCount() {
    if (!this.template ||
        !this.template.projects ||
        !this.template.projects[this.projectIndex]) {
      return 0;
    }
    return this.template.projects[this.projectIndex].briefsCount || 0;
  }

}
