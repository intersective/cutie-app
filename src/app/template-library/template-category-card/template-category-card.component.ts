import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../template-library.service';

@Component({
  selector: 'app-template-category-card',
  templateUrl: './template-category-card.component.html',
  styleUrls: ['./template-category-card.component.scss'],
})
export class TemplateCategoryCardComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {}

}
