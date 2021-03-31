import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../../template-library/template-library.service';

@Component({
  selector: 'app-template-experience-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss'],
})
export class TemplateCardComponent implements OnInit {

  @Input() template: Template;
  @Input() skeleton: false;

  constructor() { }

  ngOnInit() {}

}
