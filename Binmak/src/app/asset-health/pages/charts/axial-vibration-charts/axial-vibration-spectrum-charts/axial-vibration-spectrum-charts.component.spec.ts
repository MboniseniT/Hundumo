import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxialVibrationSpectrumChartsComponent } from './axial-vibration-spectrum-charts.component';

describe('AxialVibrationSpectrumChartsComponent', () => {
  let component: AxialVibrationSpectrumChartsComponent;
  let fixture: ComponentFixture<AxialVibrationSpectrumChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxialVibrationSpectrumChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxialVibrationSpectrumChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
