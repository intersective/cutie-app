import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { HomeService, Enrolment } from './home.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { UtilsService } from '@services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  enrolments: Array<Enrolment> = [];
  rows = [];
  selected = [];
  limit = 10;
  offset = 0;
  count = 0;
  loading = false;
  progresses = [];
  @ViewChildren('progressRef', {read: ElementRef}) progressRefs: QueryList<ElementRef>;

  constructor(
    private homeService: HomeService,
    private pusher: PusherService,
    public utils: UtilsService
  ) {
    this.utils.getEvent('student-progress').subscribe(event => {
      let index = this.rows.findIndex(row => {
        return row.uid === event.user_uid
      });
      // store the progress if the row data is not ready yet
      if (index < 0) {
        return this.progresses.push(event);
      }
      this.rows[index].progress = event.progress;
      // retrive any stored progress data and display them
      this.progresses.forEach(progress => {
        index = this.rows.findIndex(row => {
          return row.uid === progress.user_uid
        });
        this.rows[index].progress = progress.progress;
      });
      this.progresses = [];
      this.rows = [...this.rows];
    });
  }

  ngOnInit() {
    this.pusher.initialisePusher();
    this.getEnrolments(this.offset, this.limit);
  }

  getEnrolments(offset, limit) {
    this.loading = true;
    // try to get the enrolment data only if pusher is ready
    if (!this.pusher.channels.notification) {
      setTimeout(() => {
        this.getEnrolments(offset, limit);
      }, 500);
      return ;
    }
    this.homeService.getEnrolments(offset, limit).subscribe(response => {
      this.enrolments = response.data;
      this.count = response.total;
      this._updateEnrolments();
      this.loading = false;
    });
  }

  /**
   * Update the datatable row based on enrolment data
   */
  private _updateEnrolments() {
    const rows = [];
    this.enrolments.forEach(enrolment => {
      rows.push({
        uid: enrolment.userUid,
        student: enrolment.name,
        progress: [],
        action: '...'
      });
    });
    // trigger the data table detection
    this.rows = rows;
  }

  page(event) {
    this.getEnrolments(event.offset * event.limit, event.limit);
  }

  sort(event) {
    console.log(event);
  }

  isOverDue(date: string) {
    return this.utils.timeComparer(date) <= 0;
  }

  progressWidth(x) {
    return Math.floor(100/x);
  }

  scrollLeft(i) {
    const elementRef = this.progressRefs.toArray()[i];
    elementRef.nativeElement.scrollTo({left: elementRef.nativeElement.scrollLeft - 100});
  }

  scrollRight(i) {
    const elementRef = this.progressRefs.toArray()[i];
    elementRef.nativeElement.scrollTo({left: elementRef.nativeElement.scrollLeft + 100});
  }
}
