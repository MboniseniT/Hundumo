import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TangentialVibrationWaterfallChartsComponent } from './tangential-vibration-waterfall-charts.component';

describe('TangentialVibrationWaterfallChartsComponent', () => {
  let component: TangentialVibrationWaterfallChartsComponent;
  let fixture: ComponentFixture<TangentialVibrationWaterfallChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TangentialVibrationWaterfallChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TangentialVibrationWaterfallChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
