import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  decode(text: string): string {
    return decodeURIComponent(text).replaceAll('+', ' ');
  }

  sort(list: Car[] | Track[]): Car[] | Track[] {
    return list.sort((a,b) => {
      if (a.name && b.name) {
        return (a.name > b.name) ? 1: (b.name > a.name) ? -1 : 0;
      }
      return -1;
    });
  }
}
