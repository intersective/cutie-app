import { Component, Input } from '@angular/core';
import { PopupService } from '@shared/popup/popup.service';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() statValue: string;
  @Input() statLabel: string;
  @Input() statDescription: string;

  constructor(
    private popupService: PopupService
  ) { }

  showInfo() {
    this.popupService.showDescription(this.statLabel, this.statDescription);
  }
}
