import { Injectable } from '@angular/core';
import {StoreService} from '../store/store.service';
import seriesJsonFile from '../../assets/series.json';
import {UtilService} from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private objectType: string = "track";

  constructor(private storeService: StoreService, private utilService: UtilService) { }

  findAllTracks(): Track[] {
    let tracks: Track[] = [];
    seriesJsonFile.series.forEach(serie => {
      if (serie.tracks && serie.tracks.length > 0) {
        serie.tracks.forEach(track => {
          if (!this.includes(track, tracks)) {
            tracks.push(track);
          }
        })
      }
    })
    return this.utilService.sort(tracks);
  }

  save(track: Track) {
    if (track.pkgid) {
      this.storeService.set(this.objectType, track.pkgid, track);
    }
  }

  remove(track: Track) {
    if (track.pkgid) {
      this.storeService.delete(this.objectType, track.pkgid);
    }
  }

  isOwned(track: Track): boolean {
    if (track.pkgid) {
      if (this.storeService.get(this.objectType, track.pkgid)) {
        return true;
      }
    }
    return false;
  }

  private includes(trackToSearch: Track, tracks: Track[]): boolean {
    let result = false;
    tracks.forEach(track => {
      if (track.pkgid === trackToSearch.pkgid) {
        result = true;
      }
    });
    return result;
  }
}
