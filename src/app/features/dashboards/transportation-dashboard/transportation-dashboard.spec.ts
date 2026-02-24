import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationDashboard } from './transportation-dashboard';

describe('TransportationDashboard', () => {
  let component: TransportationDashboard;
  let fixture: ComponentFixture<TransportationDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportationDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
