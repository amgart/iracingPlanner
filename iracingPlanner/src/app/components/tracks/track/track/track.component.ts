import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../../services/util/util.service';
import {TrackService} from '../../../../services/track/track.service';
import {Track} from "../../../../interfaces/Track";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input()
  track: Track = {}

  checked = false;

  constructor(private utilService: UtilService, private trackService: TrackService) { }

  ngOnInit(): void {
    if (this.track.track_id) {
      this.checked = this.trackService.isOwned(this.track);
      this.track.favorite = this.trackService.isFavorite(this.track);
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
}
