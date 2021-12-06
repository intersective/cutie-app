import { Component, OnInit } from '@angular/core';
import { OnboardingService, Brief } from '../onboarding.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupService } from '@app/shared/popup/popup.service';
import { UtilsService } from '@app/shared/services/utils.service';

@Component({
  selector: 'app-briefs',
  templateUrl: './briefs.page.html',
  styleUrls: ['./briefs.page.scss'],
})
export class BriefsPage implements OnInit {
  briefs: Brief[];
  briefsSelected = [];
  constructor(
    private service: OnboardingService,
    private router: Router,
    private route: ActivatedRoute,
    private popup: PopupService,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.briefs = [];
      // @TODO get the template data from local storage to get the briefs
      this.service.getBriefs('', '').subscribe(res => {
        if (res) {
          this.briefs = res;
          this.briefsSelected = Array(res.length).fill(false);
        }
      });
    });
    this.utils.getEvent('select-brief').subscribe(uuid => {
      const briefIndex = this.briefs.findIndex(b => b.uuid === uuid);
      if (briefIndex >= 0) {
        this.briefsSelected[briefIndex] = true;
      }
    });
  }

  checkBrief(index: number) {
    this.popup.showBriefInfo(this.briefs[index]);
  }

  continue() {
    // @TODO save the user's choice in local storage
    console.log(this.briefsSelected);
    this.router.navigate(['onboarding', 'final', 4]);
  }

  get btnDisabled() {
    if (!this.briefs) {
      return true;
    }
    return !this.briefsSelected.find(res => res);
  }
}
