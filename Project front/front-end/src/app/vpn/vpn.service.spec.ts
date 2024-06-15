import { TestBed } from '@angular/core/testing';

import { VPNService } from './vpn.service';

describe('VPNService', () => {
  let service: VPNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VPNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
