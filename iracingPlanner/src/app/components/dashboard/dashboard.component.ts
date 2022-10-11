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

  seriesNameControl = new FormControl('');
  raceParticipationCreditControl = new FormControl('allSeries');
  categoryControl = new FormControl('allSeries');
  licenseControl = new FormControl('allSeries');
  displayedColumns: string[] = ['serieName', 'license', 'type', 'cars', 'fixedOpen', 'howMany',
    'week0', 'week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8', 'week9',
    'week10', 'week11'];
  dataSource: MatTableDataSource<Serie> = new MatTableDataSource();

  constructor(private serieService: SerieService, private utilService: UtilService,
              private trackService: TrackService, private carService: CarService) {
  }

  ngOnInit(): void {
    let series = this.serieService.findSeries();
    series = this.processSeries(series);
    this.dataSource = new MatTableDataSource(series);
    this.dataSource.filterPredicate = this.createFilter();
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

  canRaceSerie(serie: Serie): boolean {
    if (serie.tracks && serie.cars) {
      return this.countRaces(serie.tracks) >= 8
        && this.isSomeCarOwned(serie.cars);
    }
    return false;
  }

  filter() {
    this.dataSource.filter = `${this.seriesNameControl.value}|${this.raceParticipationCreditControl.value}|${this.categoryControl.value}|${this.licenseControl.value}` ;
  }

  private createFilter() {
    return function (data: Serie, filter: string): boolean {

      let result = false;
      const seriesNameFilter = filter.split('|')[0];
      const raceParticipationCreditFilter = filter.split('|')[1];
      const categoryFilter = filter.split('|')[2];
      const licenseFilter = filter.split('|')[3];

      // Filter by series name
      if (data.seriesname?.toLowerCase().includes(seriesNameFilter)) {
        result = true;
      }

      // Filter by race participation credit
      if (result && raceParticipationCreditFilter !== 'allSeries') {
        result = !!(data.numOwnedTracks && data.numOwnedTracks >= 8 && data.isSomeCarOwned);
      }

      // Filter by category
      if (result && categoryFilter !== 'allSeries') {
        result = data.categoryString === categoryFilter;
      }

      // Filter by license
      if (result && licenseFilter !== 'allSeries') {
        result = data.licenseString === licenseFilter;
      }

      return result;
    };
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

  private processSeries(series: Serie[]): Serie[] {
    let newSeries: Serie[] = [];
    series.forEach(serie => {
      if (serie.tracks) {
        serie.numOwnedTracks = this.countRaces(serie.tracks);
      }
      if (serie.cars) {
        serie.isSomeCarOwned = this.isSomeCarOwned(serie.cars);
      }
      if (serie.category) {
        serie.categoryString = this.getCategory(serie.category);
      }
      if (serie.minlicenselevel) {
        serie.licenseString = this.getLicense(serie.minlicenselevel);
      }
      newSeries.push(serie);
    });
    return newSeries;
  }

  private isSomeCarOwned(cars: SerieCar[]): boolean {
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

  private countRaces(tracks: SerieTrack[]): number {
    let count = 0;
    tracks.forEach(track => {
      if (track.pkgid) {
        const convertedTrack = this.trackService.findTrackBy(track.pkgid);
        if (convertedTrack && this.trackService.isOwned(convertedTrack)) {
          count++;
        }
      }
    });
    return count;
  }

}
