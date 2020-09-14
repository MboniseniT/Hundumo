import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyPeriodComponent } from './frequency-period.component';

describe('FrequencyPeriodComponent', () => {
  let component: FrequencyPeriodComponent;
  let fixture: ComponentFixture<FrequencyPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencyPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
