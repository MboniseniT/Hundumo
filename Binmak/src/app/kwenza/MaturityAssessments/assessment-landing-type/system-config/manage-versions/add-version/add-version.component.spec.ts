/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddVersionComponent } from './add-version.component';

describe('AddVersionComponent', () => {
  let component: AddVersionComponent;
  let fixture: ComponentFixture<AddVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
