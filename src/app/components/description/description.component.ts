import { Component, Input, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupService } from '@shared/popup/popup.service';

@Component({
  selector: 'app-description',
  templateUrl: 'description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  heightLimit = 35;
  @Input() content;
  @Input() popupTitle;
  @ViewChild('description') descriptionRef: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private popupService: PopupService
  ) {}

  getContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  isTruncated() {
    if (!this.descriptionRef) {
      return false;
    }
    return this.descriptionRef.nativeElement.clientHeight >= this.heightLimit;
  }

  showMore() {
    this.popupService.description(this.popupTitle, this.content);
  }

}

