import { TestBed } from '@angular/core/testing';

import { AssetHealthService } from './asset-health.service';

describe('AssetHealthService', () => {
  let service: AssetHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
