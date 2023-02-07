import { Injectable } from '@angular/core';
import {StoreService} from "../store/store.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  objectType = 'login';

  constructor(private storeService: StoreService) { }

  login(user: string, password: string): boolean {
    this.storeService.set(this.objectType, -1, {user: user, password: password});
    return true;
  }

  getStoredCredentials(): any {
    return this.storeService.get(this.objectType, -1);
  }
}
