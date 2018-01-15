import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyewearProcessComponent } from './eyewear-process-component.component';

describe('EyewearProcessComponent', () => {
  let component: EyewearProcessComponent;
  let fixture: ComponentFixture<EyewearProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyewearProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyewearProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
