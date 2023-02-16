import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgProgressRouterService } from './ng-progress-router.service';

describe('NgProgressRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: NgProgressRouterService = TestBed.get(NgProgressRouterService);
    expect(service).toBeTruthy();
  });
});
