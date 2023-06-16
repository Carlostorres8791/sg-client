import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesCreateComponent } from './vehicles-create.component';

describe('VehiclesCreateComponent', () => {
  let component: VehiclesCreateComponent;
  let fixture: ComponentFixture<VehiclesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
