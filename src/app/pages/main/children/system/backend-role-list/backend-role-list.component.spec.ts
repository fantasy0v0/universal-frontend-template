import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendRoleListComponent } from './backend-role-list.component';

describe('BackendRoleListComponent', () => {
  let component: BackendRoleListComponent;
  let fixture: ComponentFixture<BackendRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendRoleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
