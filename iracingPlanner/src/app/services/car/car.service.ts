import {Injectable} from '@angular/core';
import carJsonFile from '../../../assets/cars.json';
import {StoreService} from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private objectType: string = "car";
  private cars: Car[] = [];

  constructor(private storeService: StoreService) { }

  getCars(): Car[]  {
    if (this.cars.length === 0) {
      this.cars = this.findAllCars();
    }
    return this.cars;
  }

  save(car: Car) {
    if (car.car_id) {
      this.storeService.set(this.objectType, car.car_id, car);
    }
  }

  remove(car: Car) {
    if (car.car_id) {
      this.storeService.delete(this.objectType, car.car_id);
    }
  }

  isOwned(car: Car): boolean {
    if (car.free_with_subscription) {
      return true;
    }
    if (car.car_id) {
      if (this.storeService.get(this.objectType, car.car_id)) {
        return true;
      }
    }
    return false;
  }

  findCarBy(carId: number): Car | undefined {
    let result;
    const carList = this.getCars();
    carList.forEach(car => {
      if (car.car_id === carId) {
        result = car;
      }
    });
    return result;
  }

  private sort(list: Car[]): Car[] {
    return list.sort((a,b) => {
      if (a.car_name && b.car_name) {
        return (a.car_name > b.car_name) ? 1: (b.car_name > a.car_name) ? -1 : 0;
      }
      return -1;
    });
  }

  private findAllCars(): Car[] {
    let cars: Car[] = carJsonFile;
    return this.sort(cars);
  }
}