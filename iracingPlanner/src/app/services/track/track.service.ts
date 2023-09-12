import {Injectable} from '@angular/core';
import {StoreService} from '../store/store.service';
import trackJsonFile from '../../../assets/tracks.json';
import {Track} from "../../interfaces/Track";
import {Season} from "../../interfaces/Season";

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

  isFavorite(track: Track): boolean {
    if (track.package_id) {
      const savedTrack = this.storeService.get(this.objectType, track.package_id);
      if (savedTrack) {
        return savedTrack.favorite;
      }
    }
    return false;
  }

  isSomeTrackFavorite(tracks: Track[]): boolean {
    if (tracks && tracks.length > 0) {
      let result = false;
      tracks.forEach(track => {
        result = result || this.isFavorite(track);
      });
      return result;
    }
    return false;
  }

  findTrackBy(track_id: number): Track | undefined {
    let result;
    const trackList = this.getTracks();
    trackList.forEach(track => {
      if (track.track_id === track_id) {
        result = track;
      }
    });
    return result;
  }

  findTracksForSeason(season: Season): Track[] {
    let tracks: Track[] = [];
    if (season.schedules) {
      season.schedules.forEach((schedule: any) => {
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
    let result: Track[] = [];
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
    let tracks: Track[] = trackJsonFile;
    if (removeDuplicates) {
      tracks = this.removeDuplicates(tracks);
    }
    return this.sort(tracks);
  }
}
