import {Component, OnInit} from '@angular/core';
import {CategorisedTemplates, Category, Template, TemplateLibraryService} from '../template-library.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../shared/services/utils.service';

@Component({
  selector: 'app-template-library-home',
  templateUrl: './template-library-home.component.html',
  styleUrls: ['./template-library-home.component.scss'],
})
export class TemplateLibraryHomeComponent implements OnInit {

  constructor(
    private service: TemplateLibraryService,
    public router: Router,
    private utils: UtilsService,
  ) { }

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
      if (res === null) {
        return;
      }
      this.templates = res;
      if (res && Array.isArray(res) && res.length > 0) {
        for (const category of this.categories) {
          this.categorisedTemplates.push({
            category: category,
            templates: this.templates.filter(template => this.utils.removeAllSpecialCharactersAndToLower(template.type) === this.utils.removeAllSpecialCharactersAndToLower(category.name))
          });
        }
      }
      this.loadingTemplates = false;
    });
  }

}
