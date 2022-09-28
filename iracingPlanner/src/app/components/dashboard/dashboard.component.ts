import {Component, OnInit} from '@angular/core';
import {SerieService} from '../../services/serie/serie.service';
import {UtilService} from '../../services/util/util.service';

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

  constructor(private serieService: SerieService, private utilService: UtilService) { }

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
    let cars: Car[] = JSON.parse(jsonCars);
    cars.forEach(car => {
      result += car.name + ', ';
    });
    return this.utilService.decode(result.substring(0, result.length - 2));
  }

  private parseTracks(jsonTracks: string): Track[] {
      let result: Track[] = [];
      let tracks: Track[] = JSON.parse(jsonTracks);
      tracks.forEach(track => {
        result.push(track);
      });
      return result;
  }

  findTrack(weekNum: number, jsonTracks: string): string {
    let track = this.parseTracks(jsonTracks)[weekNum];
    if (track && track.name) {
      return this.utilService.decode(track.name);
    }
    return '';
  }
}
