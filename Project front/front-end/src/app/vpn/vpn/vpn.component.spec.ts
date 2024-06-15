import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPNComponent } from './vpn.component';

describe('VPNComponent', () => {
  let component: VPNComponent;
  let fixture: ComponentFixture<VPNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VPNComponent]
    });
    fixture = TestBed.createComponent(VPNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
