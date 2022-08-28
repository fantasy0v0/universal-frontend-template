import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserAddComponent } from './system-user-add.component';

describe('SystemUserAddComponent', () => {
  let component: SystemUserAddComponent;
  let fixture: ComponentFixture<SystemUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUserAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
