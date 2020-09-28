import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BearingComponent } from './bearing.component';

describe('BearingComponent', () => {
  let component: BearingComponent;
  let fixture: ComponentFixture<BearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BearingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
