import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearingConditionComponent } from './bearing-condition.component';

describe('BearingConditionComponent', () => {
  let component: BearingConditionComponent;
  let fixture: ComponentFixture<BearingConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearingConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearingConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
