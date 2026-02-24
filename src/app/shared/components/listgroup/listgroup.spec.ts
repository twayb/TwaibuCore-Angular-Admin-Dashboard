import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listgroup } from './listgroup';

describe('Listgroup', () => {
  let component: Listgroup;
  let fixture: ComponentFixture<Listgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listgroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listgroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
