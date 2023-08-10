import {Injectable} from '@angular/core';
import packageJson from '../../../../package.json';
import {HttpClientService} from "../httpClient/http-client.service";
import {ReleaseDTO} from "../../interfaces/ReleaseDTO";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  getCurrentVersion(): string {
    return packageJson.version;
  }

  getLatestVersion(): Promise<ReleaseDTO | undefined> {
    return this.httpClientService.getLatestVersion();
  }

}
