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
    }).compileComponents();
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

});
