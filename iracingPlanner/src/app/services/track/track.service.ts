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
      this.tracks = this.findAllTracks();
    }
    return this.tracks;
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
      if (track.package_id === trackId) {
        result = track;
      }
    });
    return result;
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

  private findAllTracks(): Track[] {
    let tracks: Track[] = trackJsonFile;
    tracks = this.removeDuplicates(tracks);
    return this.sort(tracks);
  }
}
