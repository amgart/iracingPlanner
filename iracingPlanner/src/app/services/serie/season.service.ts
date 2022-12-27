import {Injectable} from '@angular/core';
import seasonJsonFile from '../../../assets/series.json';
import {UtilService} from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private utilService: UtilService) { }

  findSeries(): Season[] {
    let seasons: Season[] = [];
    seasonJsonFile.series.forEach(season => {
      if (this.has12Races(season)) {
        seasons.push(season);
      }
    });
    return this.utilService.sortSeries(seasons);
  }

  private has12Races(season: Season): boolean {
    return season.schedules?.length === 12;
  }
}
