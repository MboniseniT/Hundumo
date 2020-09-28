import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineNotificationSettingComponent } from './machine-notification-setting.component';

describe('MachineNotificationSettingComponent', () => {
  let component: MachineNotificationSettingComponent;
  let fixture: ComponentFixture<MachineNotificationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineNotificationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineNotificationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
