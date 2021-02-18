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
  // isTruncated = false;
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

  // ngOnChanges() {
  //   setTimeout(
  //     () => {
  //       if (this.descriptionRef.nativeElement.clientHeight >= this.heightLimit) {
  //         this.isTruncated = true;
  //       } else {
  //         this.isTruncated = false;
  //       }
  //     },
  //     100
  //   );
  // }

  showMore() {
    this.popupService.description(this.popupTitle, this.content);
  }

}
