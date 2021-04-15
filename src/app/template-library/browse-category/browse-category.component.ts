import { Component, OnInit } from '@angular/core';
import {CategorisedTemplates, Category, Template, TemplateLibraryService} from '../template-library.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-browse-category',
  templateUrl: './browse-category.component.html',
  styleUrls: ['./browse-category.component.scss'],
})
export class BrowseCategoryComponent implements OnInit {

  loadingTemplates = true;
  templates: Template[] = [];
  categories: Category[] = [];
  selectedCategory: Category = null;

  constructor(private route: ActivatedRoute, private service: TemplateLibraryService) {
    this.route.params.subscribe(params => {
      this.loadTemplates(params.categoryName);
    });
  }

  ngOnInit() {
  }

  loadTemplates(categoryName: string) {
    this.loadingTemplates = true;

    this.categories = this.service.getCategories();
    this.categories.forEach(category => {
      if (category.name === categoryName) {
        this.selectedCategory = category;
      }
    });

    this.service.getTemplatesByCategory(categoryName).subscribe(res => {
      this.templates = res;
      this.loadingTemplates = false;
    });
  }

}
