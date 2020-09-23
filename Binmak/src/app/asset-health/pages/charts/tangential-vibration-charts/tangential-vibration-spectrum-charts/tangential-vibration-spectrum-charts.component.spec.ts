import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TangentialVibrationSpectrumChartsComponent } from './tangential-vibration-spectrum-charts.component';

describe('TangentialVibrationSpectrumChartsComponent', () => {
  let component: TangentialVibrationSpectrumChartsComponent;
  let fixture: ComponentFixture<TangentialVibrationSpectrumChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TangentialVibrationSpectrumChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TangentialVibrationSpectrumChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
