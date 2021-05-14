import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Template, TemplateLibraryService} from '../template-library.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {

  template: Template;
  loadingTemplate = true;
  importingTemplate = false;

  constructor(private route: ActivatedRoute, private service: TemplateLibraryService) {
    this.route.params.subscribe(params => {
      this.fetchTemplate(params.templateId);
    });
  }

  fetchTemplate(templateId: string) {
    this.loadingTemplate = true;
    this.service.getTemplate(templateId).subscribe(res => {
      this.template = res;
      this.loadingTemplate = false;
    });
  }

  importTemplate(templateId: string) {
    this.importingTemplate = true;
    this.service.importExperience(templateId).subscribe(res => {
      this.importingTemplate = false;
      console.log('Navigate the user somewhere?');
    });
  }

  ngOnInit() {}

}
