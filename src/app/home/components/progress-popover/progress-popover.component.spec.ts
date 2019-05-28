import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPopoverComponent } from './progress-popover.component';

describe('ProgressPopoverComponent', () => {
  let component: ProgressPopoverComponent;
  let fixture: ComponentFixture<ProgressPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
