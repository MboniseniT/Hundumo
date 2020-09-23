import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BBSSDeviceComponent } from './bbssdevice.component';

describe('BBSSDeviceComponent', () => {
  let component: BBSSDeviceComponent;
  let fixture: ComponentFixture<BBSSDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BBSSDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BBSSDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
