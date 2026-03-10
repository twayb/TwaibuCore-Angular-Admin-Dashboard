import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registercomplaint } from './registercomplaint';

describe('Registercomplaint', () => {
  let component: Registercomplaint;
  let fixture: ComponentFixture<Registercomplaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registercomplaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registercomplaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
