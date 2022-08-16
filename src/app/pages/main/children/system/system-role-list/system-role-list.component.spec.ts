import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRoleListComponent } from './system-role-list.component';

describe('SystemRoleListComponent', () => {
  let component: SystemRoleListComponent;
  let fixture: ComponentFixture<SystemRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemRoleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
