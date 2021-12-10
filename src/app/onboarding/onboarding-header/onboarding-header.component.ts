import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from '@services/utils.service';

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
  @Input() button: string;
  @Output() action = new EventEmitter();

  constructor(
    private router: Router,
    public utils: UtilsService
    ) { }

  goBack() {
    this.router.navigate(this.back);
  }
}
