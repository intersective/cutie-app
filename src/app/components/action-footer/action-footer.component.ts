import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-footer',
  templateUrl: './action-footer.component.html',
  styleUrls: ['./action-footer.component.scss'],
})
export class ActionFooterComponent {
  @Input() cancelOnly: boolean;
  @Input() hasCancelEvent: boolean;
  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(private router: Router) { }

  cancelEvent() {
    if (this.hasCancelEvent) {
      return this.cancel.emit();
    }
    this.router.navigate(['onboarding']);
  }

  submitEvent() {
    this.submit.emit();
  }
}
