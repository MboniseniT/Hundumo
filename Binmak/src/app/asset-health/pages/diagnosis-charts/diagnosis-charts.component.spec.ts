import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisChartsComponent } from './diagnosis-charts.component';

describe('DiagnosisChartsComponent', () => {
  let component: DiagnosisChartsComponent;
  let fixture: ComponentFixture<DiagnosisChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
