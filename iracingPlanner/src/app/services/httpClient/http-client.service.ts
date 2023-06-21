import {Injectable} from '@angular/core';
import {ReleaseDTO} from "../../interfaces/ReleaseDTO";
import {LoginDTO} from "../../interfaces/LoginDTO";
import IracingAPI from "iracing-api";
import {LoginResponseDTO} from "../../interfaces/LoginResponseDTO";
import {SeriesSeason} from "iracing-api/lib/types/series";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private GITHUB_RELEASES_URL = 'https://api.github.com/repos/amgart/iracingplanner/releases';
  private iRClient = new IracingAPI();

  constructor() { }

  getLatestVersion(): Promise<ReleaseDTO | undefined> {
    return fetch(this.GITHUB_RELEASES_URL)
      // the JSON body is taken from the response
      .then(res => res.json()).then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `ReleaseDTO` type, and return it from the promise
        const releases = res as ReleaseDTO[];
        if (releases && releases.length > 0) {
          return releases[0];
        }
        return undefined;
      });
  }

  async login(loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    const iRClient = new IracingAPI();
    await iRClient.login(loginDTO.email, loginDTO.password);
    await iRClient.getSeriesSeasons();
    return iRClient.login(loginDTO.email, loginDTO.password).then(res => {
      this.iRClient.getSeriesSeasons();
      return res.data;
    });
  }

  getSeries(): Promise<Array<SeriesSeason> | undefined> {
    return this.iRClient.getSeriesSeasons();
  }
}
