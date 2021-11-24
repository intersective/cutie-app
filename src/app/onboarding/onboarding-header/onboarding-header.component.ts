import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-header',
  templateUrl: './onboarding-header.component.html',
  styleUrls: ['./onboarding-header.component.scss'],
})
export class OnboardingHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() icon: string;
  @Input() back: [string];

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(this.back);
  }
}
