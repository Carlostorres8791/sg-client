import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsReportComponent } from './counts-report.component';

describe('CountsReportComponent', () => {
  let component: CountsReportComponent;
  let fixture: ComponentFixture<CountsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
