import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialVibrationSpectrumChartsComponent } from './radial-vibration-spectrum-charts.component';

describe('RadialVibrationSpectrumChartsComponent', () => {
  let component: RadialVibrationSpectrumChartsComponent;
  let fixture: ComponentFixture<RadialVibrationSpectrumChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialVibrationSpectrumChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialVibrationSpectrumChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
