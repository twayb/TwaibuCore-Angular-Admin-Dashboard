import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineApplication } from './online-application';

describe('OnlineApplication', () => {
  let component: OnlineApplication;
  let fixture: ComponentFixture<OnlineApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineApplication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineApplication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
