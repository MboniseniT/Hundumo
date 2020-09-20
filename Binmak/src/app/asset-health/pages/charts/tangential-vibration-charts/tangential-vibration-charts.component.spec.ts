import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TangentialVibrationChartsComponent } from './tangential-vibration-charts.component';

describe('TangentialVibrationChartsComponent', () => {
  let component: TangentialVibrationChartsComponent;
  let fixture: ComponentFixture<TangentialVibrationChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TangentialVibrationChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TangentialVibrationChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
