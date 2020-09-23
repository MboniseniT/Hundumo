import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialVibrationWaterfallChartsComponent } from './radial-vibration-waterfall-charts.component';

describe('RadialVibrationWaterfallChartsComponent', () => {
  let component: RadialVibrationWaterfallChartsComponent;
  let fixture: ComponentFixture<RadialVibrationWaterfallChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialVibrationWaterfallChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialVibrationWaterfallChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
