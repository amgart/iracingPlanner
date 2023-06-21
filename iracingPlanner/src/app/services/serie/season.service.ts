import {Injectable} from '@angular/core';
import {UtilService} from '../util/util.service';
import {Season} from "../../interfaces/Season";
import {HttpClientService} from "../httpClient/http-client.service";
import {SeriesSeason} from "iracing-api/lib/types/series";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private utilService: UtilService, private httpClientService: HttpClientService) { }

  findSeries(): Promise<SeriesSeason[] | undefined> {
    return this.httpClientService.getSeries();
  }
}
