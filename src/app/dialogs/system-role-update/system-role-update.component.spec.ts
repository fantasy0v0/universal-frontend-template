import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRoleUpdateComponent } from './system-role-update.component';

describe('SystemRoleUpdateComponent', () => {
  let component: SystemRoleUpdateComponent;
  let fixture: ComponentFixture<SystemRoleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemRoleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemRoleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
