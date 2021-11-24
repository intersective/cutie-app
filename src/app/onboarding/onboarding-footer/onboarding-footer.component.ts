import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-footer',
  templateUrl: './onboarding-footer.component.html',
  styleUrls: ['./onboarding-footer.component.scss'],
})
export class OnboardingFooterComponent {
  @Input() cancelOnly: boolean;
  @Output() submit = new EventEmitter();
  constructor(private router: Router) { }

  cancelEvent() {
    this.router.navigate(['onboarding']);
  }

  submitEvent() {
    this.submit.emit();
  }
}
