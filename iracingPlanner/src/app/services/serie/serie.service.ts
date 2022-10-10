import {Injectable} from '@angular/core';
import seriesJsonFile from '../../assets/series.json';
import {UtilService} from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private utilService: UtilService) { }

  findSeries(): Serie[] {
    let series: Serie[] = [];
    seriesJsonFile.series.forEach(serie => {
      if (this.has12Races(serie)) {
        series.push(serie);
      }
    });
    return this.utilService.sortSeries(series);
  }

  private has12Races(serie: Serie): boolean {
    return serie.tracks?.length === 12;
  }
}
