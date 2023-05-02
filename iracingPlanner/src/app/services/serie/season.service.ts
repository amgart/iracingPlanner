import {Injectable} from '@angular/core';
import {UtilService} from '../util/util.service';
import {Season} from "../../interfaces/Season";
import {HttpClientService} from "../httpClient/http-client.service";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private utilService: UtilService, private httpClientService: HttpClientService) { }

  findSeries(): Promise<Season[]> {
    return this.httpClientService.getSeries();
  }
}
