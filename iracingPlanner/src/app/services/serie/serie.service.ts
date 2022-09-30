import { Injectable } from '@angular/core';
import seriesJsonFile from '../../assets/series.json';
import {UtilService} from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private utilService: UtilService) { }

  findAllSeries(): Serie[] {
    let series: Serie[] = [];
    seriesJsonFile.series.forEach(serie => {
      series.push(serie);
    })
    return this.utilService.sortSeries(series);
  }
}
