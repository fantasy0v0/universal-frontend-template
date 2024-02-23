import { TestBed } from '@angular/core/testing';

import { BackendResourceService } from './backend-resource.service';

describe('BackendResourceService', () => {
  let service: BackendResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
