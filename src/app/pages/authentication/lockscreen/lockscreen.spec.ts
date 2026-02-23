import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lockscreen } from './lockscreen';

describe('Lockscreen', () => {
  let component: Lockscreen;
  let fixture: ComponentFixture<Lockscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lockscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lockscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
