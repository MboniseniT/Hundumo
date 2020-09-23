/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBpComponent } from './add-bp.component';

describe('AddBpComponent', () => {
  let component: AddBpComponent;
  let fixture: ComponentFixture<AddBpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
