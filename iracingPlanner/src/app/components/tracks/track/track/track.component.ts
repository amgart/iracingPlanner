import {Component, Input, OnInit} from '@angular/core';
import {TrackService} from '../../../../services/track/track.service';
import {Track} from "../../../../interfaces/Track";
import {TrackAsset} from "../../../../interfaces/TrackAsset";
import {TrackAssetService} from "../../../../services/trackAsset/track-asset.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input()
  track: Track = {}

  trackAsset: TrackAsset = {};
  checked = false;

  constructor(private trackService: TrackService, private trackAssetService: TrackAssetService) { }

  ngOnInit(): void {
    if (this.track.track_id) {
      this.checked = this.trackService.isOwned(this.track);
      this.track.favorite = this.trackService.isFavorite(this.track);
      this.trackAsset = this.trackAssetService.getAssetFor(this.track.track_id);
    }
  }

  onClick(track: Track) {
    if (this.checked) {
      this.trackService.remove(track);
    } else {
      this.trackService.save(track);
    }
  }

  favorite(favorite: boolean) {
    this.track.favorite = favorite;
    this.trackService.save(this.track);
  }

  getTrackImageUrl(): string {
    return `https://images-static.iracing.com${this.trackAsset.logo}`;
  }
}
