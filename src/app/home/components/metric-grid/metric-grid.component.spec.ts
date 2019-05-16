import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricGridComponent } from './metric-grid.component';

describe('MetricGridComponent', () => {
  let component: MetricGridComponent;
  let fixture: ComponentFixture<MetricGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
