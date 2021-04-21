import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Template, TemplateLibraryService} from '../template-library.service';

@Component({
  selector: 'browse-templates',
  templateUrl: './browse-templates.component.html',
  styleUrls: ['./browse-templates.component.scss'],
})
export class BrowseTemplatesComponent implements OnInit {

  heading: string;
  headingHighlight: string;
  emptyResultsString: string;
  templates: Template[] = [];
  loadingTemplates = true;

  constructor(private route: ActivatedRoute, private service: TemplateLibraryService) {

    this.route.url.subscribe(segment => {
      this.route.params.subscribe(params => {
      if (segment[0].path === 'search') {
        this.loadTemplatesByFilter(params.filter);
      } else {
        this.loadTemplatesByCategory(params.categoryName);
      }
      });
    });
  }

  loadTemplatesByFilter(filter: string) {
    this.loadingTemplates = true;

    this.service.getTemplatesByFilter(filter).subscribe(res => {
      this.templates = res;
      this.heading = this.templates.length + ' results for ';
      this.headingHighlight = filter;
      this.emptyResultsString = 'No results for ' + filter;

      this.loadingTemplates = false;
    });
  }

  loadTemplatesByCategory(categoryName: string) {
    this.loadingTemplates = true;

    this.service.getTemplatesByCategory(categoryName).subscribe(res => {
      this.templates = res;
      this.heading = categoryName;
      this.emptyResultsString = 'Could not find any templates for category - ' + categoryName;

      this.loadingTemplates = false;
    });
  }

  ngOnInit() {}

}
