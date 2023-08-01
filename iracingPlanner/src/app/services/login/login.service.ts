import {Injectable} from '@angular/core';
import {StoreService} from "../store/store.service";
import {LoginResponseDTO} from "../../interfaces/LoginResponseDTO";
import {HttpClientService} from "../httpClient/http-client.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  objectType = 'login';

  constructor(private storeService: StoreService,
              private httpClientService: HttpClientService) {
  }

  login(user: string, password: string): Promise<LoginResponseDTO> {
    this.storeService.set(this.objectType, -1, {
      user: user,
      password: password
    });
    const loginDTO = {
      email: user,
      password: password,
      rememberMe: false
    };
    return this.httpClientService.login(loginDTO);
  }

  getStoredCredentials(): any {
    return this.storeService.get(this.objectType, -1);
  }

}
