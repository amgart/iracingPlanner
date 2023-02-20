import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsComponent } from './cars.component';
import {CarService} from "../../services/car/car.service";

describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;
  let carService: CarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsComponent ],
      providers: [ CarService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    carService = TestBed.inject(CarService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get cars from the car service', () => {
    spyOn(carService, 'getCars').and.returnValue([{ car_id: 0, car_name: 'Civic' }, { car_id: 1, car_name: 'Corolla' }]);
    //component.ngOnInit();
    expect(component.cars.length).toBe(2);
  });

  it('should display cars in the template', () => {
    spyOn(carService, 'getCars').and.returnValue([{ car_id: 0, car_name: 'Civic' }, { car_id: 1, car_name: 'Corolla' }]);
    //component.ngOnInit();
    fixture.detectChanges();
    const carElements = fixture.nativeElement.querySelectorAll('.car');
    expect(carElements.length).toBe(2);
  });
});
