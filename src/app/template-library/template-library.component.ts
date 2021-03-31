import { Component, OnInit } from '@angular/core';
import {CategorisedTemplates, Category, Template, TemplateLibraryService} from './template-library.service';

@Component({
  selector: 'app-template-library',
  templateUrl: './template-library.component.html',
  styleUrls: ['./template-library.component.scss'],
})
export class TemplateLibraryComponent implements OnInit {

  constructor(private service: TemplateLibraryService) { }

  loadingExps = false;
  templates: Template[] = [];
  categories: Category[] = [];
  categorisedTemplates: CategorisedTemplates[] = [];

  ngOnInit() {
    this.loadExperiences();
  }

  loadExperiences() {
    this.loadingExps = true;
    this.service.getTemplates().subscribe(res => {
      this.templates = res;
      this.loadingExps = false;

      this.categories.forEach(category => {
        this.categorisedTemplates.push({
          category: category,
          templates: this.templates.filter(template => template.experienceType === category.experienceType)
        });
      });

    });
    this.categories = this.service.getCategories();
  }

  viewCategory(category: Category) {
    console.log('View category: TO BE IMPLEMENTED');
  }

  viewTemplate(template: Template) {
    console.log('View template: TO BE IMPLEMENTED');
  }

}
