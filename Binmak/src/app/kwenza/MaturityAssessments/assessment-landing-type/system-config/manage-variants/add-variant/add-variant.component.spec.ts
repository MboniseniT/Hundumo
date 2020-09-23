/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddVariantComponent } from './add-variant.component';

describe('AddVariantComponent', () => {
  let component: AddVariantComponent;
  let fixture: ComponentFixture<AddVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
