import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent {
  @Input() type = "all";
  selectedDateTime = new Date();

  selectedDateTime$: BehaviorSubject<any>;

  constructor() {
    this.selectedDateTime$ = new BehaviorSubject(this.selectedDateTime);
  }

  pickerOnChange() {
    this.selectedDateTime$.next(this.selectedDateTime);
  }

}
