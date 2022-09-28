import {Component, OnInit} from '@angular/core';
import {CarService} from '../../services/car/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = this.carService.findAllCars();

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
  }

}
