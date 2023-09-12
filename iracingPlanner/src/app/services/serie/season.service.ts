import {Injectable} from '@angular/core';
import {UtilService} from '../util/util.service';
import {Season} from "../../interfaces/Season";
import seasonJsonFile from "../../../assets/series.json";


@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private utilService: UtilService) { }

  findSeries(): Season[] {
    let seasons: Season[] = [];
    // @ts-ignore
    seasonJsonFile.forEach((season: Season) => {
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
