/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditFrmwrkComponent } from './edit-frmwrk.component';

describe('EditFrmwrkComponent', () => {
  let component: EditFrmwrkComponent;
  let fixture: ComponentFixture<EditFrmwrkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFrmwrkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFrmwrkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
