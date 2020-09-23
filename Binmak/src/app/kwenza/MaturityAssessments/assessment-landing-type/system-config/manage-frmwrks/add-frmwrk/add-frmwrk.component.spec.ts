/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddFrmwrkComponent } from './add-frmwrk.component';

describe('AddFrmwrkComponent', () => {
  let component: AddFrmwrkComponent;
  let fixture: ComponentFixture<AddFrmwrkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFrmwrkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFrmwrkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
