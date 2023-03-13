import {Component, OnInit} from '@angular/core';
import {CarService} from '../../services/car/car.service';
import {Car} from "../../interfaces/Car";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
  }

}
