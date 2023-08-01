import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CarComponent} from './car.component';
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

  it('should not initialize checked if car_id is not present', () => {
    component.car = {
      car_name: 'Test Car'
    };
    component.ngOnInit();
    expect(component.checked).toBeFalse();
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

  it('should set car as favorite and save it', () => {
    spyOn(carService, 'save').and.stub();
    component.car = { car_id: 1, favorite: false };
    component.favorite(true);
    expect(component.car.favorite).toBe(true);
    expect(carService.save).toHaveBeenCalledWith(component.car);
  });

  it('should set car as not favorite and save it', () => {
    spyOn(carService, 'save').and.stub();
    component.car = { car_id: 1, favorite: true };
    component.favorite(false);
    expect(component.car.favorite).toBe(false);
    expect(carService.save).toHaveBeenCalledWith(component.car);
  });
});
