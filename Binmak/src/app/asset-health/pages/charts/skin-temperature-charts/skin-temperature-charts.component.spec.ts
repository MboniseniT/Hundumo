import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinTemperatureChartsComponent } from './skin-temperature-charts.component';

describe('SkinTemperatureChartsComponent', () => {
  let component: SkinTemperatureChartsComponent;
  let fixture: ComponentFixture<SkinTemperatureChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinTemperatureChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinTemperatureChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
