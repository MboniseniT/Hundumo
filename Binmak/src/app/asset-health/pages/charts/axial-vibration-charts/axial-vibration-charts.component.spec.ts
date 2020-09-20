import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxialVibrationChartsComponent } from './axial-vibration-charts.component';

describe('AxialVibrationChartsComponent', () => {
  let component: AxialVibrationChartsComponent;
  let fixture: ComponentFixture<AxialVibrationChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxialVibrationChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxialVibrationChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
