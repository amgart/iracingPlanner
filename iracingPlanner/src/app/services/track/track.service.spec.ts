import { TestBed } from '@angular/core/testing';

import { TrackService } from './track.service';


describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tracks', () => {
    const tracks = service.getTracks();
    expect(tracks.length).toBeGreaterThan(0);
  });

  it('should remove duplicates from track list', () => {
    const tracks = service.getTracksWithoutDuplicates();
    expect(tracks.length).toBeGreaterThan(0);

    const packageIds = tracks.map(t => t.package_id);
    const uniqueIds = [...new Set(packageIds)];
    expect(packageIds.length).toBe(uniqueIds.length);
  });

  it('should return all tracks for a given season', () => {
    const season = {id: 1, name: 'Season 1', schedules: [{track: {track_id: 1}}, {track: {track_id: 2}}]} as any;
    const tracks = service.findTracksForSeason(season);
    expect(tracks.length).toBe(2);
  });

});
