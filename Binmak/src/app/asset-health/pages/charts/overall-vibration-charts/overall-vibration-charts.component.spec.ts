import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallVibrationChartsComponent } from './overall-vibration-charts.component';

describe('OverallVibrationChartsComponent', () => {
  let component: OverallVibrationChartsComponent;
  let fixture: ComponentFixture<OverallVibrationChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallVibrationChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallVibrationChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
