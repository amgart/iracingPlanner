import {Injectable} from '@angular/core';
import {UtilService} from '../util/util.service';
import {HttpClientService} from "../httpClient/http-client.service";
import {Season} from "../../interfaces/Season";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private utilService: UtilService, private httpClientService: HttpClientService) { }

  findSeries(): Promise<Season[] | undefined> {
    return this.httpClientService.getSeries();
  }
}
