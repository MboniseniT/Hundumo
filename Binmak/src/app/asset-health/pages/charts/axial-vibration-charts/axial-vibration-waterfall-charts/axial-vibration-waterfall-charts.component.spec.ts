import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxialVibrationWaterfallChartsComponent } from './axial-vibration-waterfall-charts.component';

describe('AxialVibrationWaterfallChartsComponent', () => {
  let component: AxialVibrationWaterfallChartsComponent;
  let fixture: ComponentFixture<AxialVibrationWaterfallChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxialVibrationWaterfallChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxialVibrationWaterfallChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
