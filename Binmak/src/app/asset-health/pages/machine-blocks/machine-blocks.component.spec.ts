import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineBlocksComponent } from './machine-blocks.component';

describe('MachineBlocksComponent', () => {
  let component: MachineBlocksComponent;
  let fixture: ComponentFixture<MachineBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
