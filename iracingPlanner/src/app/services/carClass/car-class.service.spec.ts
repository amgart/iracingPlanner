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

  it('should return the car class with the given id', () => {
    const id = 1;
    const carClassList = carClassJsonFile;
    const expectedCarClass = carClassList.find(carClass => carClass.car_class_id === id);
    const result = service.findCarClassBy(id);
    expect(result).toEqual(expectedCarClass);
  });

  it('should return all car classes', () => {
    const carClassList = carClassJsonFile;
    const result = service.findAllCarClasses();
    expect(result).toEqual(carClassList);
  });
});
