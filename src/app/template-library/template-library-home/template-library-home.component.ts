import {Component, OnInit} from '@angular/core';
import {CategorisedTemplates, Category, Template, TemplateLibraryService} from '../template-library.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-template-library-home',
  templateUrl: './template-library-home.component.html',
  styleUrls: ['./template-library-home.component.scss'],
})
export class TemplateLibraryHomeComponent implements OnInit {

  constructor(private service: TemplateLibraryService,
              public router: Router) { }

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
      if (res && Array.isArray(res) && res.length > 0) {
        this.categories.forEach(category => {
          this.categorisedTemplates.push({
            category: category,
            templates: this.templates.filter(template => template.type === category.type)
          });
        });
      }
      this.loadingTemplates = false;
    });
  }

}
