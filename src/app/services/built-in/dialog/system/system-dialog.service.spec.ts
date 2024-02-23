import { TestBed } from '@angular/core/testing';

import { SystemDialogService } from './system-dialog.service';

describe('SystemDialogService', () => {
  let service: SystemDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
