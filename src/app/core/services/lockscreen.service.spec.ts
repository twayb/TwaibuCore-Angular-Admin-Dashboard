import { TestBed } from '@angular/core/testing';

import { LockscreenService } from './lockscreen.service';

describe('LockscreenService', () => {
  let service: LockscreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
