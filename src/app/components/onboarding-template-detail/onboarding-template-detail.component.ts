import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '@app/onboarding/onboarding.service';

import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-onboarding-template-detail',
  templateUrl: './onboarding-template-detail.component.html',
  styleUrls: ['./onboarding-template-detail.component.scss'],
})
export class OnboardingTemplateDetailComponent implements OnInit {

  @Input() template: Template;
  @Output() durationChange = new EventEmitter();
  projectIndex = 0;
  durationIndex = 0;

  constructor(public utils: UtilsService) { }

  ngOnInit() {}

  get briefsCount() {
    if (!this.template ||
        !this.template.projects ||
        !this.template.projects[this.projectIndex]) {
      return 0;
    }
    return this.template.projects[this.projectIndex].briefsCount || 0;
  }

  changeDuration() {
    this.durationChange.emit(this.durationIndex);
  }

}
