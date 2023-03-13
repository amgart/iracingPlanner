import { Injectable } from '@angular/core';
import {Season} from "../../interfaces/Season";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  decode(text: string): string {
    return decodeURIComponent(text).replaceAll('+', ' ');
  }

  sortSeries(list: Season[]): Season[]{
    return list.sort((a,b) => {
      if (a.season_name && b.season_name) {
        return (a.season_name > b.season_name) ? 1: (b.season_name > a.season_name) ? -1 : 0;
      }
      return -1;
    });
  }

  getLicenseFrom(minLicenseLevel: number): string {
    switch(minLicenseLevel) {
      case 1:
        return "R";
      case 2:
        return "D";
      case 3:
        return "C";
      case 4:
        return "B";
      case 5:
        return "A";
      case 6:
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
    }
    return "Open";
  }
}
