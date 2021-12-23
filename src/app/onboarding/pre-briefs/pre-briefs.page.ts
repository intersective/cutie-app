import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from '@services/utils.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-pre-briefs',
  templateUrl: './pre-briefs.page.html',
  styleUrls: ['./pre-briefs.page.scss'],
})
export class PreBriefsPage implements OnInit {

  projectIcon: string;

  items = [
    {
      title: 'Explore our project briefs selection',
      description: 'Choose one or multiple projects from our templates. Engage your learners in real-world projects with the support of experts.',
      icon: 'fa-file-invoice',
      tags: [],
      navigate: ['onboarding', 'briefs']
    },
    {
      title: 'Custom live project briefs',
      description: 'Connect your learners with real industry project briefs. Our team of expert Industry Engagement Team will source projects from our network of 1,000+ employers relevant to your goals and needs.',
      icon: 'fa-gem',
      tags: ['Premium'],
      navigate: ['onboarding', 'final']
    },
    {
      title: 'Upload your project briefs',
      description: 'Add your own project briefs that you sourced from your network. Our team will be available to assist you  to ensure the success of your experience and meet your goals.',
      icon: 'fa-upload',
      tags: [],
      navigate: null
    },
  ];

  constructor(
    public router: Router,
    public utils: UtilsService,
    public storage: StorageService
  ) {}

  ngOnInit() {
    this.projectIcon = this.storage.get('selectedProjectIcon');
  }

  navigate(i: number) {
    if (this.items[i].navigate) {
      this.router.navigate(this.items[i].navigate);
    }
  }

}
