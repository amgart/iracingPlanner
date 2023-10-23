import {Component, OnInit} from '@angular/core';
import {SeasonService} from '../../services/serie/season.service';
import {UtilService} from '../../services/util/util.service';
import {TrackService} from '../../services/track/track.service';
import {CarService} from '../../services/car/car.service';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Car} from "../../interfaces/Car";
import {Track} from "../../interfaces/Track";
import {Season} from "../../interfaces/Season";

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
  setupControl = new FormControl('allSeries');
  ownedCarsControl = new FormControl('allSeries');
  favoriteControl = new FormControl('allSeries');
  displayedColumns: string[] = ['serieName', 'license', 'type', 'cars', 'fixedOpen', 'howMany',
    'week0', 'week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8', 'week9',
    'week10', 'week11'];
  dataSource: MatTableDataSource<Season> = new MatTableDataSource();
  private season: Season[] = [];

  constructor(private serieService: SeasonService, private utilService: UtilService,
              private trackService: TrackService, private carService: CarService) {
  }

  ngOnInit(): void {
    this.season = this.serieService.findSeries();
    this.season = this.processSeries(this.utilService.sortSeries(this.season));
    this.dataSource = new MatTableDataSource(this.season);
    this.dataSource.filterPredicate = this.createFilter();
  }

  decode(text: string | undefined): string {
    if (text) {
      return this.utilService.decode(text);
    }
    return 'undefined';
  }

  parseCars(season: Season): Car[] {
    return this.carService.findCarsForSeason(season);
  }

  getTrackLabel(weekNum: number, season: Season): string {
    const track = this.findTrack(weekNum, season);
    if (track && track.track_name) {
      return this.decode(track.track_name);
    }
    return '';
  }

  isTrackOwned(weekNum: number, season: Season): boolean {
    const track = this.findTrack(weekNum, season);
    if (track) {
      return this.trackService.isOwned(track);
    }
    return false;
  }

  canRaceSerie(season: Season): boolean {
    const tracks: Track[] = this.trackService.findTracksForSeason(season);
    const cars: Car[] = this.parseCars(season);
    if (tracks && cars) {
      return this.countRaces(tracks) >= 8 && this.isSomeCarOwned(cars);
    }
    return false;
  }

  filter() {
    this.dataSource.filter = `${this.seriesNameControl.value}|${this.raceParticipationCreditControl.value}|${this.categoryControl.value}|${this.licenseControl.value}|${this.setupControl.value}|${this.ownedCarsControl.value}|${this.favoriteControl.value}`;
  }

  getCssClassForWeek(weekNum: number): string {
    let cssClass = '';
    const currentWeekStartDate = this.getCurrentWeekStartDate(weekNum, this.season[0]);
    if (currentWeekStartDate
      && this.isPreviousTo(this.calculateWeekEndDate(currentWeekStartDate), new Date())) {
      cssClass = 'doneWeek';
    }
    return cssClass;
  }

  private calculateWeekEndDate(date: Date): Date {
    date.setDate(date.getDate() + 7);
    return date;
  }

  private getCurrentWeekStartDate(weekNum: number, season: Season): Date | undefined {
    if (season && season.schedules) {
      const schedule = season.schedules[weekNum];
      if (schedule.startDate) {
        return new Date(schedule.startDate);
      }
    }
    return undefined;
  }

  private isPreviousTo(date: Date, referenceDate: Date): boolean {
    return date < referenceDate;
  }

  private createFilter() {
    return function (data: Season, filter: string): boolean {

      let result = false;
      const filterSplit = filter.split('|');
      const seriesNameFilter = filterSplit[0];
      const raceParticipationCreditFilter = filterSplit[1];
      const categoryFilter = filterSplit[2];
      const licenseFilter = filterSplit[3];
      const setupFilter = filterSplit[4];
      const ownedCarsFilter = filterSplit[5];
      const favoriteFilter = filterSplit[6];

      // Filter by series name
      if (data.season_name?.toLowerCase().includes(seriesNameFilter)) {
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

      // Filter by setup
      if (result && setupFilter !== 'allSeries') {
        result = data.setupString === setupFilter;
      }

      // Filter by ownedCars
      if (result && ownedCarsFilter !== 'allSeries') {
        result = data.isSomeCarOwned !== undefined && data.isSomeCarOwned;
      }

      // Filter by favoriteContent
      if (result && favoriteFilter !== 'allSeries') {
        result = data.isSomeContentFavorite !== undefined && data.isSomeContentFavorite;
      }

      return result;
    };
  }

  private findTrack(weekNum: number, season: Season): Track {
    return this.trackService.findTracksForSeason(season)[weekNum];
  }

  private processSeries(seasons: Season[]): Season[] {
    let newSeries: Season[] = [];
    seasons.forEach(season => {
      const tracks = this.trackService.findTracksForSeason(season);
      if (tracks) {
        season.numOwnedTracks = this.countRaces(tracks);
      }
      const cars = this.carService.findCarsForSeason(season);
      if (cars) {
        season.isSomeCarOwned = this.isSomeCarOwned(cars);
      }
      if (tracks && tracks.length > 0 && tracks[0].category_id) {
        season.categoryString = this.getCategory(tracks[0].category_id);
      }
      if (season.license_group) {
        season.licenseString = this.getLicense(season.license_group);
      }
      if (season.fixed_setup !== undefined) {
        season.setupString = this.getFixedOpenSetup(season.fixed_setup);
      }
      if (cars && tracks) {
        season.isSomeContentFavorite =  this.carService.isSomeCarFavorite(cars) || this.trackService.isSomeTrackFavorite(tracks);
      }
      newSeries.push(season);
    });
    return newSeries;
  }

  private isSomeCarOwned(cars: Car[]): boolean {
    let result = false;
    cars.forEach(car => {
      if (car.car_id) {
        const convertedCar = this.carService.findCarBy(car.car_id);
        if (convertedCar && !result) {
          result = this.carService.isOwned(convertedCar);
        }
      }
    });
    return result;
  }

  private countRaces(tracks: Track[]): number {
    let count = 0;
    tracks.forEach(track => {
      if (track.track_id) {
        const convertedTrack = this.trackService.findTrackBy(track.track_id);
        if (convertedTrack && this.trackService.isOwned(convertedTrack)) {
          count++;
        }
      }
    });
    return count;
  }

  private getFixedOpenSetup(isFixedSetup: boolean): string {
    return this.utilService.getFixedOpenSetup(isFixedSetup);
  }

  private getLicense(minLicenseLevel: number): string {
    return this.utilService.getLicenseFrom(minLicenseLevel);
  }

  private getCategory(category: number): string {
    return this.utilService.getCategory(category);
  }
}
