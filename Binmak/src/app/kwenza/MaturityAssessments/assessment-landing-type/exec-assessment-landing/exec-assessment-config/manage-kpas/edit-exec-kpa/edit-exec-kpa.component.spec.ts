/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditExecKpaComponent } from './edit-exec-kpa.component';

describe('EditExecKpaComponent', () => {
  let component: EditExecKpaComponent;
  let fixture: ComponentFixture<EditExecKpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExecKpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExecKpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
