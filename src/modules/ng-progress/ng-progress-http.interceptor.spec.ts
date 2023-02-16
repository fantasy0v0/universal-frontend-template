import { TestBed } from '@angular/core/testing';

import { NgProgressHttpInterceptor } from './ng-progress-http.interceptor';

describe('NgProgressHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgProgressHttpInterceptor = TestBed.get(NgProgressHttpInterceptor);
    expect(service).toBeTruthy();
  });
});
