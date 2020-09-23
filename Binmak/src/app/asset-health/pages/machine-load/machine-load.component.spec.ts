import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineLoadComponent } from './machine-load.component';

describe('MachineLoadComponent', () => {
  let component: MachineLoadComponent;
  let fixture: ComponentFixture<MachineLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
