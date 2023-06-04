import { TestBed } from '@angular/core/testing';

import { NgProgress } from './ng-progress.service';

describe('NgProgress', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgProgress = TestBed.get(NgProgress);
    expect(service).toBeTruthy();
  });
});
