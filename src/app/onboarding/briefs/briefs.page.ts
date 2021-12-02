import { Component, OnInit } from '@angular/core';
import { OnboardingService, Brief } from '../onboarding.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.briefs = [];
    this.service.getBriefs('', '').subscribe(res => {
      if (res) {console.log('here');
        this.briefs = res;
      }
    });
  }

  continue() {

  }
}
