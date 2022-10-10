import {Component, OnInit} from '@angular/core';
import {SerieService} from '../../services/serie/serie.service';
import {UtilService} from '../../services/util/util.service';
import {TrackService} from '../../services/track/track.service';
import {CarService} from '../../services/car/car.service';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashForm = new FormControl('');
  displayedColumns: string[] = ['serieName', 'license', 'type', 'cars', 'fixedOpen', 'howMany',
    'week0', 'week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8', 'week9',
    'week10', 'week11'];
  dataSource: MatTableDataSource<Serie> = new MatTableDataSource();

  constructor(private serieService: SerieService, private utilService: UtilService,
              private trackService: TrackService, private carService: CarService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.serieService.findSeries());
  }

  decode(text: string | undefined): string {
    if (text) {
      return this.utilService.decode(text);
    }
    return 'undefined';
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

  parseCars(jsonCars: string): SerieCar[] {
    return JSON.parse(jsonCars);
  }

  private parseTracks(jsonTracks: string): Track[] {
    let result: Track[] = [];
    const tracks: SerieTrack[] = JSON.parse(jsonTracks);
    tracks.forEach(track => {
      if (track.pkgid) {
        const convertedTrack = this.trackService.findTrackBy(track.pkgid);
        if (convertedTrack) {
          result.push(convertedTrack);
        }
      }
    });
    return result;
  }

  private findTrack(weekNum: number, jsonTracks: string): Track {
    return this.parseTracks(jsonTracks)[weekNum];
  }

  getTrackLabel(weekNum: number, jsonTracks: string): string {
    const track = this.findTrack(weekNum, jsonTracks);
    if (track && track.track_name) {
      return this.decode(track.track_name);
    }
    return '';
  }

  isTrackOwned(weekNum: number, jsonTracks: string): boolean {
    const track = this.findTrack(weekNum, jsonTracks);
    return this.trackService.isOwned(track);
  }

  isSomeCarOwned(jsonCars: string): boolean {
    const cars: SerieCar[] = JSON.parse(jsonCars);
    let result = false;
    cars.forEach(car => {
      if (car.id) {
        const convertedCar = this.carService.findCarBy(car.id);
        if (convertedCar) {
          result = this.carService.isOwned(convertedCar);
        }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
