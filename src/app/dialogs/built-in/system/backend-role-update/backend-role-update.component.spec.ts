import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendRoleUpdateComponent } from './backend-role-update.component';

describe('BackendRoleUpdateComponent', () => {
  let component: BackendRoleUpdateComponent;
  let fixture: ComponentFixture<BackendRoleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendRoleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendRoleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
