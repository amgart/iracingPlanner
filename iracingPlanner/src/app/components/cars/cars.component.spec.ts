import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsComponent } from './cars.component';
import {CarService} from "../../services/car/car.service";

describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;
  let carService: CarService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ CarsComponent ],
      providers: [ CarService ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarsComponent);
    carService = TestBed.inject(CarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
