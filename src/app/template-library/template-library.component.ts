import { Component, OnInit } from '@angular/core';
import {CategorisedTemplates, Category, Template, TemplateLibraryService} from './template-library.service';

@Component({
  selector: 'app-template-library',
  templateUrl: './template-library.component.html',
  styleUrls: ['./template-library.component.scss'],
})
export class TemplateLibraryComponent implements OnInit {

  constructor(private service: TemplateLibraryService) { }

  loadingTemplates = false;
  templates: Template[] = [];
  categories: Category[] = [];
  categorisedTemplates: CategorisedTemplates[] = [];

  ngOnInit() {
    this.loadTemplates();
  }

  loadTemplates() {
    this.loadingTemplates = true;

    this.categories = this.service.getCategories();

    this.service.getTemplates().subscribe(res => {
      this.templates = res;
      this.categories.forEach(category => {
        this.categorisedTemplates.push({
          category: category,
          templates: this.templates.filter(template => template.type === category.type)
        });
      });
      this.loadingTemplates = false;
    });
  }

  viewCategory(category: Category) {
    console.log('View category: TO BE IMPLEMENTED');
  }

  viewTemplate(template: Template) {
    console.log('View template: TO BE IMPLEMENTED');
  }

}
