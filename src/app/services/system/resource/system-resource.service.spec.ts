import { TestBed } from '@angular/core/testing';

import { SystemResourceService } from './system-resource.service';

describe('SystemResourceService', () => {
  let service: SystemResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
