import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCategoryCardComponent } from './template-category-card.component';

describe('TemplateCategoryCardComponent', () => {
  let component: TemplateCategoryCardComponent;
  let fixture: ComponentFixture<TemplateCategoryCardComponent>;

  const category = {
    'leadImage': '',
    'name': 'Team Projects',
    'experienceType': 'team project',
    'color': 'rgba(0,64,229, 0.7)',
    'size': 0
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCategoryCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCategoryCardComponent);
    component = fixture.componentInstance;
    component.category = category;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
