import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendUserAddComponent } from './backend-user-add.component';

describe('BackendUserAddComponent', () => {
  let component: BackendUserAddComponent;
  let fixture: ComponentFixture<BackendUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendUserAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
