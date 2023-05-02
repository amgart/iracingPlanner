import {Injectable} from '@angular/core';
import {ReleaseDTO} from "../../interfaces/ReleaseDTO";
import {LoginDTO} from "../../interfaces/LoginDTO";
import {Client} from "./client";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private GITHUB_RELEASES_URL = 'https://api.github.com/repos/amgart/iracingplanner/releases';
  private IRACING_BASE_URL = 'https://members-ng.iracing.com'
  private IRACING_AUTH_URL = '/auth';
  private IRACING_GET_SEASONS = '/data/series/seasons?include_series=true';
  private email: string = '';
  private password: string = '';

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

  login(loginDTO: LoginDTO): Promise<any> {
    return fetch(this.IRACING_BASE_URL + this.IRACING_AUTH_URL, {
      method: 'POST',
      headers: {'Accept': '*/*', "Content-type": "application/json"},
      body: JSON.stringify(loginDTO)
    }).then(res => res.json()).then(res => {
      if (res.authCode !== 0) {
        this.email = loginDTO.email;
        this.password = loginDTO.password;
      }
      console.log('------', res);
      return res;
    });
  }

  getSeries(): any {
    console.log('_----eeeeo');
    const client = new Client(this.email, this.password);
    client.get(this.IRACING_GET_SEASONS);
    //return fetch(this.IRACING_BASE_URL + this.IRACING_GET_SEASONS).then(res => res.json()).then(res => {
    //  console.log('------', res);
    //  return res.json();
    //}).then(res => {
    //   return res as Season[];
    //});
  }
}
