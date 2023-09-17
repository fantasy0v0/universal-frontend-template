import { TestBed } from '@angular/core/testing';

import { SystemActionService } from './system-action.service';

describe('SystemActionService', () => {
  let service: SystemActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
