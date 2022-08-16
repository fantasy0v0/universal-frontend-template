import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeclomeComponent } from './weclome.component';

describe('WeclomeComponent', () => {
  let component: WeclomeComponent;
  let fixture: ComponentFixture<WeclomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeclomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeclomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
