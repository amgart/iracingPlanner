import { Injectable } from '@angular/core';
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: ElectronStore | undefined;

  constructor() {
    if (window.require) {
      try {
        const storeClass = window.require("electron-store");
        this.store = new storeClass();
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("electron-store was not loaded");
    }
  }

  get = (key: string): any => {
    if (this.store){
      return this.store.get(key);
    }
  }

  set = (key: string, value: any): void => {
    if (this.store) {
      this.store.set(key, value);
    }
  }
}
