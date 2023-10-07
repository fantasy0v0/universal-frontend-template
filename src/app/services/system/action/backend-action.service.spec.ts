import { TestBed } from '@angular/core/testing';

import { BackendActionService } from './backend-action.service';

describe('BackendActionService', () => {
  let service: BackendActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
