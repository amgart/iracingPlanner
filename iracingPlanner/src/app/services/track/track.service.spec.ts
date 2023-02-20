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

  it('should return the correct track given a track id', () => {
    const track = service.findTrackBy(3);
    expect(track?.track_name).toBe('Daytona International Speedway - 2008');
  });

  it('should return all tracks for a given season', () => {
    const season = {id: 1, name: 'Season 1', schedules: [{track: {track_id: 1}}, {track: {track_id: 2}}]} as any;
    const tracks = service.findTracksForSeason(season);
    expect(tracks.length).toBe(2);
  });

  it('should save and remove a track', () => {
    const track = {track_id: 999, track_name: 'Test Track'} as any;
    service.save(track);
    let savedTrack = service.findTrackBy(999);
    expect(savedTrack?.track_name).toBe('Test Track');

    service.remove(track);
    savedTrack = service.findTrackBy(999);
    expect(savedTrack).toBeUndefined();
  });

  it('should check if a track is owned', () => {
    const track1 = {track_id: 1, package_id: 1, free_with_subscription: false} as any;
    const track2 = {track_id: 2, free_with_subscription: true} as any;

    expect(service.isOwned(track1)).toBe(false);
    expect(service.isOwned(track2)).toBe(true);

    service.save(track1);
    expect(service.isOwned(track1)).toBe(true);

    service.remove(track1);
    expect(service.isOwned(track1)).toBe(false);
  });
});
