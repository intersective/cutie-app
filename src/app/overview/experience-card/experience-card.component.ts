import { Component, Input } from '@angular/core';
import { Experience } from '../overview.service';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent {
  @Input() experience: Experience;

  constructor() { }

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

  edit() {

  }

  addTag() {

  }

  duplicate() {

  }

  delete() {

  }

  refresh() {

  }
}
