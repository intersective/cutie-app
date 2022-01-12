import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '@app/shared/services/analytics.service';

@Component({
  selector: 'app-action-footer',
  templateUrl: './action-footer.component.html',
  styleUrls: ['./action-footer.component.scss'],
})
export class ActionFooterComponent {
  @Input() cancelOnly: boolean;
  @Input() hasCancelEvent: boolean;
  @Input() btnSubmitText = 'continue';
  @Input() btnSubmitDisabled;
  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(
    private router: Router,
    private analytics: AnalyticsService
  ) { }

  cancelEvent() {
    if (this.hasCancelEvent) {
      return this.cancel.emit();
    }
    this.analytics.track('[Onboarding] Cancel button clicked');
    this.router.navigate(['onboarding']);
  }

  submitEvent() {
    this.submit.emit();
  }
}
