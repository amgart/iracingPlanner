import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  decode(text: string): string {
    return decodeURIComponent(text).replaceAll('+', ' ');
  }

  sort(list: SerieTrack[]): SerieTrack[] {
    return list.sort((a,b) => {
      if (a.name && b.name) {
        return (a.name > b.name) ? 1: (b.name > a.name) ? -1 : 0;
      }
      return -1;
    });
  }

  sortSeries(list: Serie[]): Serie[]{
    return list.sort((a,b) => {
      if (a.seriesname && b.seriesname) {
        return (a.seriesname > b.seriesname) ? 1: (b.seriesname > a.seriesname) ? -1 : 0;
      }
      return -1;
    });
  }

  getLicenseFrom(minLicenseLevel: number): string {
    switch(minLicenseLevel) {
      case 1:
        return "R";
      case 4:
        return "D";
      case 8:
        return "C";
      case 12:
        return "B";
      case 16:
        return "A";
      case 18:
        return "Pro";
      default:
        return minLicenseLevel.toString();
    }
  }

  getCategory(category: number): string {
    switch(category) {
      case 1:
        return "Oval";
      case 2:
        return "Road";
      case 3:
        return "Dirt Oval";
      case 4:
        return "Dirt Road";
      default:
        return category.toString();
    }
  }

  getFixedOpenSetup(isFixedSetup: boolean): string {
    if (isFixedSetup) {
      return "Fixed";
    } else {
      return "Open";
    }
  }
}
