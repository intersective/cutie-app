import { Component, Input } from '@angular/core';
import { Experience, OverviewService } from '../overview.service';
import { PopupService } from '@shared/popup/popup.service';
import { UtilsService } from '@services/utils.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent {
  @Input() experience: Experience;
  @Input() skeleton: boolean;
  refreshing = false;

  constructor(
    private popupService: PopupService,
    private service: OverviewService,
    private utils: UtilsService,
  ) { }

  lastUpdated() {
    if (this.experience && this.experience.statistics.lastUpdated) {
      let diff = Date.now() - this.experience.statistics.lastUpdated;
      if (diff > 1000 * 60 * 60 * 24) {
        return `${ Math.floor(diff / (1000 * 60 * 60 * 24)) }d`;
      }
      if (diff > 1000 * 60 * 60) {
        return `${ Math.floor(diff / (1000 * 60 * 60)) }h`;
      }
      if (diff > 1000 * 60) {
        return `${ Math.floor(diff / (1000 * 60)) }m`;
      }
      if (diff < 0) {
        diff = 1000;
      }
      return `${ Math.floor(diff / 1000) }s`;
    }
    return '';
  }

  userCount() {
    if (!this.experience.statistics.enrolledUserCount) {
      return 0;
    }
    let total = 0;
    for (const c of ['admin', 'coordinator', 'mentor', 'participant']) {
      total += this.experience.statistics.enrolledUserCount[c];
    }
    return total;
  }

  userCountStyle(role: string) {
    if (!this.experience.statistics.enrolledUserCount[role]) {
      return '';
    }
    const ratio = Math.round(this.experience.statistics.registeredUserCount[role] * 100 / this.experience.statistics.enrolledUserCount[role]);
    if (ratio === 0) {
      return '';
    }
    return `linear-gradient(90deg, var(--ion-color-primary-tint) ${ ratio }%, #fff ${ 100 - ratio }%)`;
  }

  onTrack() {
    if (!this.experience.statistics) {
      return null;
    }
    if (this.experience.statistics.onTrackRatio < 0) {
      return null;
    }
    return Math.round(this.experience.statistics.onTrackRatio * 100);
  }

  offTrack() {
    if (!this.experience.statistics) {
      return null;
    }
    if (this.experience.statistics.onTrackRatio < 0) {
      return null;
    }
    return Math.round((1 - this.experience.statistics.onTrackRatio) * 100);
  }

  onTrackInfo() {
    this.popupService.showDescription('About Pulse rating', 'Participants are prompted from time to time to report whether they feel the experience they are participating in, is on-track. The responses are aggregated, and the overall split between on and off-track sentiments is displayed.');
  }

  activeParticipant() {
    const stat = this.experience.statistics;
    if (stat.activeUserCount.participant && stat.registeredUserCount.participant) {
      return Math.round(stat.activeUserCount.participant * 100 / stat.registeredUserCount.participant);
    }
    return 0;
  }

  activeMentor() {
    const stat = this.experience.statistics;
    if (stat.activeUserCount.mentor && stat.registeredUserCount.mentor) {
      return Math.round(stat.activeUserCount.mentor * 100 / stat.registeredUserCount.mentor);
    }
    return 0;
  }

  reviewRatingAvg() {
    if (this.experience.statistics.reviewRatingAvg > 1) {
      return 100;
    }
    if (this.experience.statistics.reviewRatingAvg < 0) {
      return 0;
    }
    return Math.round(this.experience.statistics.reviewRatingAvg * 100);
  }

  view() {
    this.popupService.showLoading({
      message: 'Entering the experience'
    });
    if (this.experience.timelineId) {
      window.top.location.href = `${ environment.Practera }/users/change/timeline/${ this.experience.timelineId }`;
    } else {
      setTimeout(() => this.popupService.dismissLoading(), 1000);
    }
  }

  edit() {
    this.popupService.showLoading({
      message: 'Going to edit the experience'
    });
    if (this.experience.timelineId && this.experience.id) {
      window.top.location.href = `${ environment.Practera }/users/change/timeline/${ this.experience.timelineId }?redirect=/admin/experiences/edit/${ this.experience.id }`;
    } else {
      setTimeout(() => this.popupService.dismissLoading(), 1000);
    }
  }

  addTag() {
    this.popupService.showTags({
      tags: JSON.parse(JSON.stringify(this.experience.tags)),
      type: 'experience',
      data: this.experience,
      title: 'Tags',
    });
  }

  moreTags() {
    this.popupService.showTagsView({
      tags: this.experience.tags,
      title: this.experience.name,
    });
  }

  duplicate() {
    this.popupService.showDuplicateExp(this.experience.uuid);
  }

  delete() {
    this.popupService.showAlert({
      message: 'Are you sure you want to delete this experience?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this.popupService.showLoading({
              message: 'Deleting the experience'
            });
            this.service.deleteExperience(this.experience).subscribe(res => {
              this.utils.broadcastEvent('exps-reload', {});
              setTimeout(() => this.popupService.dismissLoading(), 500);
            });
          }
        },
      ]
    });
  }

  archive() {
    this.popupService.showAlert({
      message: 'Are you sure you want to archive this experience?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this.popupService.showLoading({
              message: 'Archiving the experience'
            });
            this.service.archiveExperience(this.experience).subscribe(res => {
              this.utils.broadcastEvent('exps-reload', {});
              setTimeout(() => this.popupService.dismissLoading(), 500);
            });
          }
        },
      ]
    });
  }

  refresh() {
    this.refreshing = true;
    this.service.getExpStatistics(this.experience).subscribe(res => {
      this.utils.broadcastEvent('exp-statistics-updated', {
        experience: this.experience,
        statistics: res
      });
      this.refreshing = false;
    });
  }
}
