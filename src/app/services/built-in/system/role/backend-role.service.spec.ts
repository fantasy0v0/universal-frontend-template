import { TestBed } from '@angular/core/testing';

import { BackendRoleService } from './backend-role.service';

describe('BackendRoleService', () => {
  let service: BackendRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
