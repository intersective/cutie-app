import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDownloadCardComponent } from './resource-download-card.component';

describe('ResourceDownloadCardComponent', () => {
  let component: ResourceDownloadCardComponent;
  let fixture: ComponentFixture<ResourceDownloadCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDownloadCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDownloadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
