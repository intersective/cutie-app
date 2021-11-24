import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfExperiencePage } from './type-of-experience.page';

describe('TypeOfExperiencePage', () => {
  let component: TypeOfExperiencePage;
  let fixture: ComponentFixture<TypeOfExperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfExperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
