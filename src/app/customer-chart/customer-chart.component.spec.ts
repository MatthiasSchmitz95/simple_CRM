import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChartComponent } from './customer-chart.component';

describe('CustomerChartComponent', () => {
  let component: CustomerChartComponent;
  let fixture: ComponentFixture<CustomerChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerChartComponent]
    });
    fixture = TestBed.createComponent(CustomerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
