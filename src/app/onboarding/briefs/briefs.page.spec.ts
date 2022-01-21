import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefsPage } from './briefs.page';

describe('BriefsPage', () => {
  let component: BriefsPage;
  let fixture: ComponentFixture<BriefsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
