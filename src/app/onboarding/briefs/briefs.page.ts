import { Component, OnInit } from '@angular/core';
import { OnboardingService, Brief } from '../onboarding.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupService } from '@app/shared/popup/popup.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { StorageService } from '@app/shared/services/storage.service';

@Component({
  selector: 'app-briefs',
  templateUrl: './briefs.page.html',
  styleUrls: ['./briefs.page.scss'],
})
export class BriefsPage implements OnInit {
  briefs: Brief[];
  briefsSelected = [];
  projectIcon: string;
  constructor(
    private service: OnboardingService,
    private router: Router,
    private route: ActivatedRoute,
    private popup: PopupService,
    public utils: UtilsService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.projectIcon = this.storage.get('selectedProjectIcon');
    this.route.params.subscribe(params => {
      this.briefs = [];
      const onboardingData = this.storage.getOnboardingData();
      if (!onboardingData.template || !onboardingData.template.uuid || !onboardingData.template.duration) {
        return this.router.navigate(['onboarding']);
      }
      this.service.getBriefs(onboardingData.template.uuid, onboardingData.template.duration).subscribe(res => {
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
    const briefs: { uuid: string; name: string }[] = [];
    this.briefsSelected.forEach((b, i) => b ? briefs.push({
      uuid: this.briefs[i].uuid,
      name: this.briefs[i].name
    }) : '');
    this.storage.setOnboardingData({ briefs: briefs});
    this.router.navigate(['onboarding', 'final', 4]);
  }

  get btnDisabled() {
    if (!this.briefs) {
      return true;
    }
    return !this.briefsSelected.find(res => res);
  }
}
