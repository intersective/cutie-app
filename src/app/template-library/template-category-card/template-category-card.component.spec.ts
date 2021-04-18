import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TemplateCategoryCardComponent} from './template-category-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('TemplateCategoryCardComponent', () => {
  let component: TemplateCategoryCardComponent;
  let fixture: ComponentFixture<TemplateCategoryCardComponent>;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  const category = {
    'leadImage': '',
    'name': 'Team Projects',
    'type': 'team project',
    'color': 'rgba(0,64,229, 0.7)',
    'isLarge': true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
      ],
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

  afterEach(() => {
    fixture.destroy();
  });
});
