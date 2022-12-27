import { Injectable } from '@angular/core';
import carClassJsonFile from '../../../assets/carClasses.json';

@Injectable({
  providedIn: 'root'
})
export class CarClassService {

  constructor() { }

  findCarClassBy(id: number): CarClass | undefined {
    let result;
    const carClassList = this.findAllCarClasses();
    carClassList.forEach(carClass => {
      if (carClass.car_class_id === id) {
        result = carClass;
      }
    });
    return result;
  }

  private findAllCarClasses(): CarClass[] {
    return carClassJsonFile;
  }
}
