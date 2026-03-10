import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trackcomplaint } from './trackcomplaint';

describe('Trackcomplaint', () => {
  let component: Trackcomplaint;
  let fixture: ComponentFixture<Trackcomplaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trackcomplaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trackcomplaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
