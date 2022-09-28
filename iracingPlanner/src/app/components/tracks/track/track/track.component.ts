import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../../services/util/util.service';
import {TrackService} from '../../../../services/track/track.service';

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
    this.checked = this.trackService.isOwned(this.track);
  }

  getLabel(track: Track): string {
    if (track.name) {
      return this.utilService.decode(track.name);
    }
    return '';
  }

  onClick(track: Track) {
    if (this.checked) {
      this.trackService.remove(track);
    } else {
      this.trackService.save(track);
    }
  }

}
