import {Component, OnInit} from '@angular/core';
import {TrackService} from '../../services/track/track.service';
import {Track} from "../../interfaces/Track";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  tracks: Track[] = [];

  constructor(private trackService: TrackService) {
  }

  ngOnInit(): void {
    this.tracks = this.trackService.getTracksWithoutDuplicates();
  }
}
