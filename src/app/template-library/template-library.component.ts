import {Component, OnInit} from '@angular/core';
import {Category, TemplateLibraryService} from './template-library.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-template-library',
  templateUrl: './template-library.component.html',
  styleUrls: ['./template-library.component.scss'],
})
export class TemplateLibraryComponent implements OnInit {

  constructor(
    private service: TemplateLibraryService,
    public router: Router
  ) {}

  categories: Category[] = [];

  ngOnInit() {
    this.categories = this.service.getCategories();
  }

  encodeURI(param) {
    return encodeURI(param);
  }

  onSearch(event: CustomEvent) {
    if (event.detail.value) {
      this.router.navigate( ['templates', 'search', event.detail.value]);
    } else {
      this.router.navigate( ['templates']);
    }
  }

}
