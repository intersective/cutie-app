import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ProgressTableService, Enrolment } from './progress-table.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { UtilsService } from '@services/utils.service';
import { PopoverController } from '@ionic/angular';
import { ProgressPopoverComponent } from '@components/progress-popover/progress-popover.component';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-progress-table',
  templateUrl: './progress-table.component.html',
  styleUrls: ['./progress-table.component.scss'],
})
export class ProgressTableComponent implements OnInit {
  enrolments: Array<Enrolment> = [];
  rows = [];
  limit = 10;
  offset = 0;
  // sorted by progress
  sorted = null;
  // total number of records
  count = 0;
  // is getting data or not
  loading = false;
  // type of progress table
  type = 'student';
  // progress array
  progresses = [];
  // whether display search bar or not
  searching = false;
  // the value of the search bar
  filter = '';
  @ViewChild('searchRef') searchRef: IonInput;
  @ViewChildren('progressRef', {read: ElementRef}) progressRefs: QueryList<ElementRef>;

  constructor(
    private service: ProgressTableService,
    private pusher: PusherService,
    public utils: UtilsService,
    public popoverController: PopoverController
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
    this.getEnrolments();
  }

  getEnrolments() {
    this.loading = true;
    // try to get the enrolment data only if pusher is ready
    if (!this.pusher.channels.notification) {
      setTimeout(() => {
        this.getEnrolments();
      }, 500);
      return ;
    }
    this.service.getEnrolments(this.offset, this.limit, this.sorted).subscribe(response => {
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
        student: {
          name: enrolment.name,
          email: enrolment.email,
          image: enrolment.image
        },
        team: enrolment.teamName,
        progress: [],
      });
    });
    // trigger the data table detection
    this.rows = rows;
  }

  switchType() {
    if (this.type === 'student') {
      this.type = 'project';
    } else {
      this.type = 'student';
    }
  }

  // toggle the search bar
  onSearch() {
    this.searching = !this.searching;
    if (this.searching) {
      setTimeout(
        () => {
          this.searchRef.setFocus();
        },
        500
      );
    }
  }

  /**
   * filter the data based on value in search bar
   */
  search() {
    this.getEnrolments();
  }

  /**
   * Go to the next/any page
   */
  page(event) {
    this.offset = event.offset * event.limit;
    this.limit = event.limit;
    this.getEnrolments();
  }

  /**
   * Sort the table by progress
   */
  sort(event) {
    if (event.sorts[0].dir === 'asc') {
      this.sorted = 'progress';
    } else {
      this.sorted = '-progress';
    }
    this.offset = 0;
    this.getEnrolments();
  }

  /**
   * check if this date is overdue
   */
  isOverDue(date: string) {
    return this.utils.timeComparer(date) <= 0;
  }

  async presentPopover(ev: any, progress) {

    const popover = await this.popoverController.create({
      component: ProgressPopoverComponent,
      event: ev,
      componentProps: {
        progress: progress
      },
      mode: 'ios'
    });
    return await popover.present();
  }

  /**
   * Calculate the width percentage for each progress cell
   * @param number x number of progress cells
   */
  progressWidth(x) {
    return (100/x - 0.1).toFixed(2);
  }

  /**
   * When scrolling the progress left/right
   * @param number scrollLeft Scrolled to which position
   */
  scroll(scrollLeft) {
    this.progressRefs.toArray().forEach(progressRef => {
      progressRef.nativeElement.scrollTo({left: scrollLeft});
    });
  }

}
