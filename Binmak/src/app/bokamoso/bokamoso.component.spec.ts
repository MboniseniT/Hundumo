import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BokamosoComponent } from './bokamoso.component';

describe('BokamosoComponent', () => {
  let component: BokamosoComponent;
  let fixture: ComponentFixture<BokamosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BokamosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BokamosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
