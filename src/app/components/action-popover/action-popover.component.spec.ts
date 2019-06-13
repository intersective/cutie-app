import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPopoverComponent } from './action-popover.component';

describe('ActionPopoverComponent', () => {
  let component: ActionPopoverComponent;
  let fixture: ComponentFixture<ActionPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
