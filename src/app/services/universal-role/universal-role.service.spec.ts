import { TestBed } from '@angular/core/testing';

import { UniversalRoleService } from './universal-role.service';

describe('UniversalRoleService', () => {
  let service: UniversalRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversalRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
