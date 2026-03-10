import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintPortal } from './complaint-portal';

describe('ComplaintPortal', () => {
  let component: ComplaintPortal;
  let fixture: ComponentFixture<ComplaintPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
