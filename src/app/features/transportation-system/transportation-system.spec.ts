import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationSystem } from './transportation-system';

describe('TransportationSystem', () => {
  let component: TransportationSystem;
  let fixture: ComponentFixture<TransportationSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportationSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
