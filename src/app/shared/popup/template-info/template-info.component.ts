import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnboardingService, Template } from '@app/onboarding/onboarding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-info',
  templateUrl: 'template-info.component.html',
  styleUrls: ['template-info.component.scss']
})

export class TemplateInfoComponent implements OnInit {
  uuid: string;
  title: string;
  template: Template;
  durationIndex = 0;

  constructor(
    private modalController: ModalController,
    private service: OnboardingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.template = null;
    this.service.getTemplateDetail(this.uuid).subscribe(res => {
      this.template = res;
    });
  }

  confirm() {
    console.log(this.durationIndex);
    this.modalController.dismiss();
    this.router.navigate(['onboarding', 'pre-brief']);
  }

  cancel() {
    return this.modalController.dismiss();
  }
}
