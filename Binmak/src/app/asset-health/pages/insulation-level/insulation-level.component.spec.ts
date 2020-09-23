import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulationLevelComponent } from './insulation-level.component';

describe('InsulationLevelComponent', () => {
  let component: InsulationLevelComponent;
  let fixture: ComponentFixture<InsulationLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
