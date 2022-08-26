import { HasPermissionDirective } from './has-permission.directive';
import {TestBed} from "@angular/core/testing";

describe('HasPermissionDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({});
    const directive = TestBed.inject(HasPermissionDirective);
    expect(directive).toBeTruthy();
  });
});
