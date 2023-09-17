import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemResourceUpdateComponent } from './system-resource-update.component';

describe('SystemResourceUpdateComponent', () => {
  let component: SystemResourceUpdateComponent;
  let fixture: ComponentFixture<SystemResourceUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SystemResourceUpdateComponent]
    });
    fixture = TestBed.createComponent(SystemResourceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
