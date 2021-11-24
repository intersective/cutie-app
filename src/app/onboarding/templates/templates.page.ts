import { Component, OnInit } from '@angular/core';
import { OnboardingService, Template } from '../onboarding.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {
  templates: [Template];
  constructor(private service: OnboardingService) { }

  ngOnInit() {
    this.service.getTemplates().subscribe(res => {
      this.templates = res;
    });
  }

  customExperience() {
    console.log('custom exp');
  }
}
