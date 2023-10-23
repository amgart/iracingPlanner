import { TestBed } from '@angular/core/testing';

import { CarAssetService } from './car-asset.service';

describe('CarAssetService', () => {
  let service: CarAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
