import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdminsComponent } from './register-admins.component';

describe('RegisterAdminsComponent', () => {
  let component: RegisterAdminsComponent;
  let fixture: ComponentFixture<RegisterAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAdminsComponent]
    });
    fixture = TestBed.createComponent(RegisterAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
