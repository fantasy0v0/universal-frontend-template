import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemResourceListComponent } from './system-resource-list.component';

describe('SystemResourceListComponent', () => {
  let component: SystemResourceListComponent;
  let fixture: ComponentFixture<SystemResourceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SystemResourceListComponent]
    });
    fixture = TestBed.createComponent(SystemResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
