import {Injectable} from '@angular/core';
import {ReleaseDTO} from "../../interfaces/ReleaseDTO";
import {LoginDTO} from "../../interfaces/LoginDTO";
import {LoginResponseDTO} from "../../interfaces/LoginResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private GITHUB_RELEASES_URL = 'https://api.github.com/repos/amgart/iracingplanner/releases';
  private IRACING_AUTH_URL = 'https://members-ng.iracing.com/auth';

  constructor() { }

  getLatestVersion(): Promise<ReleaseDTO | undefined> {
    return fetch(this.GITHUB_RELEASES_URL)
      // the JSON body is taken from the response
      .then(res => res.json()).then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        const releases = res as ReleaseDTO[];
        if (releases && releases.length > 0) {
          return res[0];
        }
        return undefined;
      });
  }

  login(loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return fetch(this.IRACING_AUTH_URL, {
      method: 'POST',
      body: JSON.stringify(loginDTO),
      credentials: 'include',
      headers: {'Accept': '*/*', "Content-type": "application/json"}
    }).then(res => res.json()).then(res => {
      return res as LoginResponseDTO;
    });
  }
}
