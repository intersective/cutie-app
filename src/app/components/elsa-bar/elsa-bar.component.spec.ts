import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElsaBarComponent } from './elsa-bar.component';

describe('ElsaBarComponent', () => {
  let component: ElsaBarComponent;
  let fixture: ComponentFixture<ElsaBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElsaBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElsaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
