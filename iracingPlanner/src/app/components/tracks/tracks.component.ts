import {Component} from '@angular/core';
import {TrackService} from '../../services/track/track.service';
import {Track} from "../../interfaces/Track";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {

  tracks: Track[] = this.trackService.getTracksWithoutDuplicates();

  constructor(private trackService: TrackService) {
  }

}
