import {Injectable} from '@angular/core';
import seriesJsonFile from '../../assets/series.json';
import {StoreService} from '../store/store.service';
import {UtilService} from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private objectType: string = "car";

  constructor(private storeService: StoreService, private utilService: UtilService) { }

  findAllCars(): Car[] {
    let cars: Car[] = [];
    seriesJsonFile.series.forEach(serie => {
      if (serie.cars && serie.cars.length > 0) {
        serie.cars.forEach(car => {
          if (!this.includes(car, cars)) {
            cars.push(car);
          }
        })
      }
    })
    return this.utilService.sort(cars);
  }

  save(car: Car) {
    if (car.id) {
      this.storeService.set(this.objectType, car.id, car);
    }
  }

  remove(car: Car) {
    if (car.id) {
      this.storeService.delete(this.objectType, car.id);
    }
  }

  isOwned(car: Car): boolean {
    if (car.id) {
      if (this.storeService.get(this.objectType, car.id)) {
        return true;
      }
    }
    return false;
  }

  private includes(carToSearch: Car, cars: Car[]): boolean {
    let result = false;
    cars.forEach(car => {
      if (car.id === carToSearch.id) {
        result = true;
      }
    });
    return result;
  }
}
