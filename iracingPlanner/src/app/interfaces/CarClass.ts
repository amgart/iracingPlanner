import {CarsInClass} from "./CarsInClass";

export interface CarClass {
  car_class_id?: number;
  cars_in_class?: CarsInClass[];
  cust_id?: number;
  name?: string;
  relative_speed?: number;
  short_name?: string;
}
