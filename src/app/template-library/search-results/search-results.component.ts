import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Template, TemplateLibraryService} from '../template-library.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {

  loadingTemplates = true;
  templates: Template[] = [];
  filter: string;

  constructor(private route: ActivatedRoute, private service: TemplateLibraryService) {
    this.route.params.subscribe(params => {
      this.loadTemplates(params.filter);
    });
  }

  loadTemplates(filter: string) {
    this.loadingTemplates = true;
    this.filter = filter;

    this.service.getTemplatesByFilter(filter).subscribe(res => {
      this.templates = res;
      this.loadingTemplates = false;
    });
  }

  ngOnInit() {}

}
