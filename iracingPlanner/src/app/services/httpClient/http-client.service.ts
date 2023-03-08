import { Injectable } from '@angular/core';
import {ReleaseDTO} from "../../interfaces/ReleaseDTO";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor() { }

  getLatestVersion(): Promise<ReleaseDTO | undefined> {
    return fetch('https://api.github.com/repos/amgart/iracingplanner/releases')
      // the JSON body is taken from the response
      .then(res => res.json())
      .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        const releases = res as ReleaseDTO[];
        if (releases && releases.length > 0) {
          return res[0];
        }
        return undefined;
      });
  }
}