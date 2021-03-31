import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../../template-library/template-library.service';

@Component({
  selector: 'app-template-experience-card',
  templateUrl: './template-experience-card.component.html',
  styleUrls: ['./template-experience-card.component.scss'],
})
export class TemplateExperienceCardComponent implements OnInit {

  @Input() template: Template;

  constructor() { }

  ngOnInit() {}

}
