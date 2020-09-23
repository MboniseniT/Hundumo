import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeCategoryComponent } from './size-category.component';

describe('SizeCategoryComponent', () => {
  let component: SizeCategoryComponent;
  let fixture: ComponentFixture<SizeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
