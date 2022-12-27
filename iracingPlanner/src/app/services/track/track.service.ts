import {Injectable} from '@angular/core';
import {StoreService} from '../store/store.service';
import trackJsonFile from '../../../assets/tracks.json';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private objectType: string = "track";
  private tracks: Track[] = [];

  constructor(private storeService: StoreService) {
  }

  getTracks(): Track[] {
    if (this.tracks.length === 0) {
      this.tracks = this.findAllTracks(false);
    }
    return this.tracks;
  }

  getTracksWithoutDuplicates(): Track[] {
    return this.findAllTracks(true)
  }

  save(track: Track) {
    if (track.package_id) {
      this.storeService.set(this.objectType, track.package_id, track);
    }
  }

  remove(track: Track) {
    if (track.package_id) {
      this.storeService.delete(this.objectType, track.package_id);
    }
  }

  isOwned(track: Track): boolean {
    if (track.free_with_subscription) {
      return true;
    }
    if (track.package_id) {
      if (this.storeService.get(this.objectType, track.package_id)) {
        return true;
      }
    }
    return false;
  }

  findTrackBy(trackId: number): Track | undefined {
    let result;
    const trackList = this.getTracks();
    trackList.forEach(track => {
      if (track.track_id === trackId) {
        result = track;
      }
    });
    return result;
  }

  findTracksForSeason(season: Season): Track[] {
    let tracks: Track[] = [];
    if (season.schedules) {
      season.schedules.forEach(schedule => {
        if (schedule.track && schedule.track.track_id) {
          const track = this.findTrackBy(schedule.track.track_id);
          if (track) {
            tracks.push(track);
          }
        }
      });
    }
    return tracks;
  }

  private sort(list: Track[]): Track[] {
    return list.sort((a, b) => {
      if (a.track_name && b.track_name) {
        return (a.track_name > b.track_name) ? 1 : (b.track_name > a.track_name) ? -1 : 0;
      }
      return -1;
    });
  }

  private removeDuplicates(originalTracks: Track[]): Track[] {
    let result: Car[] = [];
    let inserted: number[] = [];
    originalTracks.forEach(track => {
      if (track.package_id && !inserted.includes(track.package_id)) {
        inserted.push(track.package_id);
        result.push(track);
      }
    });
    return result;
  }

  private findAllTracks(removeDuplicates: boolean): Track[] {
    let tracks: Car[] = trackJsonFile;
    if (removeDuplicates) {
      tracks = this.removeDuplicates(tracks);
    }
    return this.sort(tracks);
  }
}
