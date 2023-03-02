import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import {Car} from "../../interfaces/Car";
import {StoreService} from "../store/store.service";

describe('CarService', () => {
  let service: CarService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if there are no cars', () => {
    // Arrange
    spyOn(service, 'findAllCars').and.returnValue([]);

    // Act
    const cars = service.getCars();

    // Assert
    expect(cars.length).toBe(0);
  });

  it('should return the same array of cars if called multiple times', () => {
    // Arrange
    spyOn(service, 'findAllCars').and.returnValue([{
      car_id: 1,
      car_name: 'Car 1'
    }, {
      car_id: 2,
      car_name: 'Car 2'
    }]);

    // Act
    const cars1 = service.getCars();
    const cars2 = service.getCars();

    // Assert
    expect(cars1).toEqual(cars2);
  });

  it('should return an array of cars', () => {
    // Arrange
    spyOn(service, 'findAllCars').and.returnValue([{
      car_id: 1,
      car_name: 'Car 1'
    }, {
      car_id: 2,
      car_name: 'Car 2'
    }]);

    // Act
    const cars = service.getCars();

    // Assert
    expect(cars.length).toBe(2);
    expect(cars[0].car_name).toBe('Car 1');
    expect(cars[1].car_name).toBe('Car 2');
  });

  it('should return true for a car with free_with_subscription', () => {
    const car: Car = {
      car_id: 1,
      car_name: 'Car A',
      free_with_subscription: true,
    };

    expect(service.isOwned(car)).toBeTrue();
  });

  it('should return a car if one exists with the given ID', () => {
    const cars: Car[] = [
      { car_id: 1, car_name: 'Car A' },
      { car_id: 2, car_name: 'Car B' },
    ];

    spyOn(service, 'getCars').and.returnValue(cars);

    const result = service.findCarBy(2);

    expect(result).toEqual({ car_id: 2, car_name: 'Car B' });
  });

  it('should return undefined if no car exists with the given ID', () => {
    const cars: Car[] = [
      { car_id: 1, car_name: 'Car A' },
      { car_id: 2, car_name: 'Car B' },
    ];

    spyOn(service, 'getCars').and.returnValue(cars);

    const result = service.findCarBy(3);

    expect(result).toBeUndefined();
  });

  it('should sort cars alphabetically by name', () => {
    const cars = [
      { car_name: 'Audi', car_id: 1 },
      { car_name: 'BMW', car_id: 2 },
      { car_name: 'Ford', car_id: 3 },
      { car_name: 'Honda', car_id: 4 }
    ];
    const sortedCars = service.sort(cars);

    expect(sortedCars[0].car_name).toBe('Audi');
    expect(sortedCars[1].car_name).toBe('BMW');
    expect(sortedCars[2].car_name).toBe('Ford');
    expect(sortedCars[3].car_name).toBe('Honda');
  });

  it('should return empty array when list is empty', () => {
    const cars: Car[] = [];
    const sortedCars = service.sort(cars);

    expect(sortedCars).toEqual([]);
  });

  it('should sort the cars by name', () => {
    const sortedCars: Car[] = [
      { car_id: 2, car_name: 'Car A' },
      { car_id: 3, car_name: 'Car B' },
      { car_id: 1, car_name: 'Car C' },
    ];
    spyOn(service, 'sort').and.returnValue(sortedCars);
    const result = service.findAllCars();
    expect(result).toEqual(sortedCars);
  });

});
