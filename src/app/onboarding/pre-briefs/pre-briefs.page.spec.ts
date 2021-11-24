import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBriefsPage } from './pre-briefs.page';

describe('PreBriefsPage', () => {
  let component: PreBriefsPage;
  let fixture: ComponentFixture<PreBriefsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreBriefsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBriefsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
