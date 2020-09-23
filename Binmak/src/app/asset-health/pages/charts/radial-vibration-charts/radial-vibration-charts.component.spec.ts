import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialVibrationChartsComponent } from './radial-vibration-charts.component';

describe('RadialVibrationChartsComponent', () => {
  let component: RadialVibrationChartsComponent;
  let fixture: ComponentFixture<RadialVibrationChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialVibrationChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialVibrationChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
