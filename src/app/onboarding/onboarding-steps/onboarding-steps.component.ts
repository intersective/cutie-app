import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-steps',
  templateUrl: './onboarding-steps.component.html',
  styleUrls: ['./onboarding-steps.component.scss'],
})
export class OnboardingStepsComponent implements OnInit {
  @Input() step: number;
  @Input() total: number;
  steps: string[];
  constructor() { }

  ngOnInit(): void {
    if (+this.total === 4) {
      this.steps = ['Details', 'Experience Templates', 'Project Briefs', 'Create'];
    } else {
      this.steps = ['Details', 'Learning Design', 'Create'];
    }
  }

}
