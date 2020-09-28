import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinmakTechnologyComponent } from './binmak-technology.component';

describe('BinmakTechnologyComponent', () => {
  let component: BinmakTechnologyComponent;
  let fixture: ComponentFixture<BinmakTechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinmakTechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinmakTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
