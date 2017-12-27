import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocationDetailComponentComponent } from './store-location-detail-component.component';

describe('StoreLocationDetailComponentComponent', () => {
  let component: StoreLocationDetailComponentComponent;
  let fixture: ComponentFixture<StoreLocationDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLocationDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLocationDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
