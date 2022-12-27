import {Component} from '@angular/core';
import {TrackService} from '../../services/track/track.service';

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
