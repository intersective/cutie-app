import { Component, Input } from '@angular/core';
import { Experience, OverviewService } from '../overview.service';
import { PopupService } from '@shared/popup/popup.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent {
  @Input() experience: Experience;
  refreshing = false;

  constructor(
    private popupService: PopupService,
    private service: OverviewService,
    private utils: UtilsService,
  ) { }

  lastUpdated() {
    if (this.experience && this.experience.statistics.lastUpdated) {
      const diff = Date.now() - this.experience.statistics.lastUpdated;
      if (diff > 1000 * 60 * 60 * 24) {
        return `${ Math.floor(diff/(1000 * 60 * 60 * 24)) }d`;
      }
      if (diff > 1000 * 60 * 60) {
        return `${ Math.floor(diff/(1000 * 60 * 60)) }h`;
      }
      if (diff > 1000 * 60) {
        return `${ Math.floor(diff/(1000 * 60)) }m`;
      }
      return `${ Math.floor(diff/1000) }s`;
    }
    return '';
  }

  userCount() {
    if (!this.experience.statistics.enrolledUserCount) {
      return 0;
    }
    let total = 0;
    for (let c of ['admin', 'coordinator', 'mentor', 'participant']) {
      total += this.experience.statistics.enrolledUserCount[c];
    }
    return total;
  }

  userCountStyle(role: string) {
    if (!this.experience.statistics.enrolledUserCount[role]) {
      return '';
    }
    const ratio = Math.round(this.experience.statistics.registeredUserCount[role] * 100 / this.experience.statistics.enrolledUserCount[role]);
    return `linear-gradient(90deg, var(--ion-color-primary-tint) ${ ratio }%, #fff ${ 100 - ratio }%)`;
  }

  onTrack() {
    if (!this.experience.statistics) {
      return null;
    }
    if (this.experience.statistics.onTrackRatio < 0) {
      return null;
    }
    return this.experience.statistics.onTrackRatio * 100;
  }

  offTrack() {
    if (!this.experience.statistics) {
      return null;
    }
    if (this.experience.statistics.onTrackRatio < 0) {
      return null;
    }
    return (1 - this.experience.statistics.onTrackRatio) * 100;
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

  edit() {

  }

  addTag() {
    this.popupService.showTags({
      tags: JSON.parse(JSON.stringify(this.experience.tags)),
      type: 'experience',
      data: this.experience,
      title: 'Tags',
    });
  }

  duplicate() {

  }

  delete() {

  }

  refresh() {
    this.refreshing = true;
    this.service.getExpStatistics(this.experience).subscribe(res => {
      this.utils.broadcastEvent('exp-statistics-updated', {
        experience: this.experience,
        statistics: res
      });
      this.refreshing = false;
    })
  }
}
