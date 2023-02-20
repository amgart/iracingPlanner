import { TestBed } from '@angular/core/testing';
import carClassJsonFile from '../../../assets/carClasses.json';
import { CarClassService } from './car-class.service';

describe('CarClassService', () => {
  let service: CarClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find a car class by id', () => {
    const expectedCarClass = carClassJsonFile[0]; // Assuming the JSON file has at least one car class.
    const result = service.findCarClassBy(expectedCarClass.car_class_id);
    expect(result).toEqual(expectedCarClass);
  });

  it('should return undefined when trying to find a car class that does not exist', () => {
    const result = service.findCarClassBy(-1);
    expect(result).toBeUndefined();
  });
});
