import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkInvalidComponent } from './link-invalid.component';

describe('LinkInvalidComponent', () => {
  let component: LinkInvalidComponent;
  let fixture: ComponentFixture<LinkInvalidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkInvalidComponent]
    });
    fixture = TestBed.createComponent(LinkInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
