import {Component, OnInit} from '@angular/core';
import {SerieService} from '../../services/serie/serie.service';
import {UtilService} from '../../services/util/util.service';
import {TrackService} from '../../services/track/track.service';
import {CarService} from '../../services/car/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['serieName', 'license', 'type', 'cars', 'fixedOpen', 'howMany',
    'week0', 'week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8', 'week9',
    'week10', 'week11'];
  dataSource: Serie[] = [];

  constructor(private serieService: SerieService, private utilService: UtilService,
              private trackService: TrackService, private carService: CarService) {
  }

  ngOnInit(): void {
    this.dataSource = this.serieService.findAllSeries();
  }

  getLabel(text: string): string {
    return this.utilService.decode(text);
  }

  getLicense(minLicenseLevel: number): string {
    return this.utilService.getLicenseFrom(minLicenseLevel);
  }

  getCategory(category: number): string {
    return this.utilService.getCategory(category);
  }

  getFixedOpenSetup(isFixedSetup: boolean): string {
    return this.utilService.getFixedOpenSetup(isFixedSetup);
  }

  parseCars(jsonCars: string): string {
    let result = '';
    const cars: Car[] = JSON.parse(jsonCars);
    cars.forEach(car => {
      result += car.name + '%0A';
    });
    return this.utilService.decode(result.substring(0, result.length - 3));
  }

  private parseTracks(jsonTracks: string): Track[] {
      let result: Track[] = [];
      const tracks: Track[] = JSON.parse(jsonTracks);
      tracks.forEach(track => {
        result.push(track);
      });
      return result;
  }

  private findTrack(weekNum: number, jsonTracks: string): Track {
    return this.parseTracks(jsonTracks)[weekNum];
  }

  getTrackLabel(weekNum: number, jsonTracks: string): string {
    const track = this.findTrack(weekNum, jsonTracks);
    if (track && track.name) {
      return this.utilService.decode(track.name);
    }
    return '';
  }

  isTrackOwned(weekNum: number, jsonTracks: string): boolean {
    const track = this.findTrack(weekNum, jsonTracks);
    if (track && track.pkgid && this.trackService.isOwned(track)) {
      return true;
    }
    return false;
  }

  isSomeCarOwned(jsonCars: string): boolean {
    const cars: Car[] = JSON.parse(jsonCars);
    let result = false;
    cars.forEach(car => {
      if (this.carService.isOwned(car)) {
        result = true;
      }
    });
    return result;
  }

  countRaces(jsonTracks: string): number {
    const tracks = this.parseTracks(jsonTracks);
    let count = 0;
    tracks.forEach(track => {
      if (this.trackService.isOwned(track)) {
        count++;
      }
    });
    return count;
  }

  canRaceSerie(serie: Serie): boolean {
    return this.countRaces(JSON.stringify(serie.tracks)) >= 8
      && this.isSomeCarOwned(JSON.stringify(serie.cars));
  }
}
