import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtkComponent } from './htk-component.component';

describe('HtkComponent', () => {
  let component: HtkComponent;
  let fixture: ComponentFixture<HtkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
