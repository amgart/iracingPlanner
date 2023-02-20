import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarComponent } from './car.component';
import {UtilService} from "../../../services/util/util.service";
import {CarService} from "../../../services/car/car.service";

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let utilService: UtilService;
  let carService: CarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarComponent ],
      providers: [ UtilService, CarService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    utilService = TestBed.inject(UtilService);
    carService = TestBed.inject(CarService);
    component.car = {
      car_id: 123,
      car_name: 'Test Car'
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize checked if car_id is present', () => {
    spyOn(carService, 'isOwned').and.returnValue(true);
    component.ngOnInit();
    expect(component.checked).toBeTrue();
  });

  it('should call carService remove when checkbox is checked', () => {
    spyOn(carService, 'remove').and.stub();
    component.checked = true;
    component.onClick(component.car);
    expect(carService.remove).toHaveBeenCalledWith(component.car);
  });

  it('should call carService save when checkbox is not checked', () => {
    spyOn(carService, 'save').and.stub();
    component.checked = false;
    component.onClick(component.car);
    expect(carService.save).toHaveBeenCalledWith(component.car);
  });

});
