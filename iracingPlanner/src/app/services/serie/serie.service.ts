import { Injectable } from '@angular/core';
import seriesJsonFile from '../../assets/series.json';
import {UtilService} from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private utilService: UtilService) { }

  findSeries(filter?: string): Serie[] {
    let series: Serie[] = [];
    seriesJsonFile.series.forEach(serie => {
      if (filter) {
        if (this.utilService.decode(serie.seriesname).toLowerCase().includes(filter.toLowerCase())) {
          series.push(serie);
        }
      } else {
        series.push(serie);
      }
    });
    return this.utilService.sortSeries(series);
  }
}
