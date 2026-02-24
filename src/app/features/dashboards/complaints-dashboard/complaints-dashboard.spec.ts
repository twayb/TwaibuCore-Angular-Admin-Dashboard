import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsDashboard } from './complaints-dashboard';

describe('ComplaintsDashboard', () => {
  let component: ComplaintsDashboard;
  let fixture: ComponentFixture<ComplaintsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
