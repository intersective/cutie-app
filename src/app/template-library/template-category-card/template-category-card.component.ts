import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../template-library.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-template-category-card',
  templateUrl: './template-category-card.component.html',
  styleUrls: ['./template-category-card.component.scss'],
})
export class TemplateCategoryCardComponent implements OnInit {

  @Input() category: Category;

  constructor(private router: Router) { }

  ngOnInit() {}

}
