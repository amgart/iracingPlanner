import { TestBed } from '@angular/core/testing';

import { TrackAssetService } from './track-asset.service';

describe('TrackAssetService', () => {
  let service: TrackAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
