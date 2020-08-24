import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-popover',
  templateUrl: './progress-popover.component.html',
  styleUrls: ['./progress-popover.component.scss']
})
export class ProgressPopoverComponent implements OnInit {

  @Input() progress = {
    status: '',
    overdue: false,
    submitted: '',
    due_date: '',
    name: ''
  };
  status: string;
  constructor() { }

  ngOnInit() {
    this.status = this.progress.status;
    if (this.progress.status === 'pending approval') {
      this.status = 'waiting to be published';
    }
    if (this.progress.overdue && ['not started', 'in progress'].includes(this.progress.status)) {
      this.status = 'overdue';
    }
  }

}
