/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditBpComponent } from './edit-bp.component';

describe('EditBpComponent', () => {
  let component: EditBpComponent;
  let fixture: ComponentFixture<EditBpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
