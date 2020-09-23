/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddKpiComponent } from './add-kpi.component';

describe('AddKpiComponent', () => {
  let component: AddKpiComponent;
  let fixture: ComponentFixture<AddKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
