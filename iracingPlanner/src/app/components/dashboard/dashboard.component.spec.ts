import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {SeasonService} from "../../services/serie/season.service";
import {UtilService} from "../../services/util/util.service";
import {CarService} from "../../services/car/car.service";
import {TrackService} from "../../services/track/track.service";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let seasonService:  SeasonService;
  let utilsService: UtilService;
  let carService: CarService;
  let trackService: TrackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [SeasonService, UtilService, CarService]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    seasonService = TestBed.inject(SeasonService);
    utilsService = TestBed.inject(UtilService);
    trackService = TestBed.inject(TrackService);
    carService = TestBed.inject(CarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    spyOn(seasonService, 'findSeries').and.returnValue([
      { season_id: 1 },
      { season_id: 2 }]);
    component.ngOnInit();
    expect(seasonService.findSeries).toHaveBeenCalledTimes(1);
    expect(component.dataSource).toBeDefined();
  });

  it('should return undefined if text to decode is undefined', () => {
    const val = component.decode(undefined);
    expect(val).toEqual('undefined')
  });

  it('should return decode text if defined', () => {
    spyOn(utilsService, 'decode').and.returnValue('text next');
    const val = component.decode('text+next');
    expect(val).toEqual('text next');
  });

  it('should return car list from season', () => {
    const season = {
      season_id: 1,
      car_class_ids: [1, 2, 3, 4, 5]
    };
    const expectedCars = [
      { car_id: 1 },
      { car_id: 2 },
      { car_id: 3 },
      { car_id: 4 },
      { car_id: 5 },
    ];
    spyOn(carService, 'findCarsForSeason').and.returnValue(expectedCars);
    const cars = component.parseCars(season);
    expect(cars).toEqual(expectedCars)
  });

  it('should return empty string if track does not exist', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([]);
    const val = component.getTrackLabel(2, season);
    expect(val).toEqual('');
  });

  it('should return track label if track does exist in season for the week', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([
      { track_id: 0, track_name: 'track' },
      { track_id: 1, track_name: 'track 2' }]);
    const val = component.getTrackLabel(1, season);
    expect(val).toEqual('track 2');
  });

  it('should return if track is owned if the track exists', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([
      { track_id: 0, track_name: 'track' },
      { track_id: 1, track_name: 'track 2' }]);
    spyOn(trackService, 'isOwned').and.returnValue(true);
    const val = component.isTrackOwned(1, season);
    expect(trackService.isOwned).toHaveBeenCalledTimes(1);
    expect(val).toBeTrue();
  });

  it('should return false if track does not exist', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([
      { track_id: 0, track_name: 'track' },
      { track_id: 1, track_name: 'track 2' }]);
    const val = component.isTrackOwned(2, season);
    expect(val).toBeFalse();
  });

  it('should return false when verifying participation credits if track does not exist', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([]);
    spyOn(carService, 'findCarsForSeason').and.returnValue([
      { car_id: 1 },
      { car_id: 2 }
    ]);
    const val = component.canRaceSerie(season);
    expect(val).toBeFalse();
  });

  it('should return false when verifying participation credits if car does not exist', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([
      { track_id: 0, track_name: 'track' },
      { track_id: 1, track_name: 'track 2' }]);
    spyOn(carService, 'findCarsForSeason').and.returnValue([]);
    const val = component.canRaceSerie(season);
    expect(val).toBeFalse();
  });

  it('should return false when verifying participation credits if no more than 8 races can be raced', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([
      { track_id: 0, track_name: 'track' },
      { track_id: 1, track_name: 'track 2' }]);
    spyOn(carService, 'findCarsForSeason').and.returnValue([
      { car_id: 1 }
    ]);
    const val = component.canRaceSerie(season);
    expect(val).toBeFalse();
  });

  it('should return false when verifying participation credits if no owned car is available', () => {
    const season = {
      season_id: 1,
      schedules: [
        { race_week_num: 0, track: { track_id: 0, track_name: 'track' }},
        { race_week_num: 1, track: { track_id: 1, track_name: 'track 2' }}
      ]
    };
    spyOn(trackService, 'findTracksForSeason').and.returnValue([
      { track_id: 0, track_name: 'track 1' },
      { track_id: 1, track_name: 'track 2' },
      { track_id: 2, track_name: 'track 3' },
      { track_id: 3, track_name: 'track 4' },
      { track_id: 4, track_name: 'track 5' },
      { track_id: 5, track_name: 'track 6' },
      { track_id: 6, track_name: 'track 7' },
      { track_id: 7, track_name: 'track 8' }]);
    spyOn(carService, 'findCarsForSeason').and.returnValue([
      { car_id: 1 }
    ]);
    spyOn(carService, 'findCarBy').and.returnValue(undefined);
    const val = component.canRaceSerie(season);
    expect(val).toBeFalse();
  });

});
