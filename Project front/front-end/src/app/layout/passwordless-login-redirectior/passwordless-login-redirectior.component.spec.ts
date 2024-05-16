import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordlessLoginRedirectiorComponent } from './passwordless-login-redirectior.component';

describe('PasswordlessLoginRedirectiorComponent', () => {
  let component: PasswordlessLoginRedirectiorComponent;
  let fixture: ComponentFixture<PasswordlessLoginRedirectiorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordlessLoginRedirectiorComponent]
    });
    fixture = TestBed.createComponent(PasswordlessLoginRedirectiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
