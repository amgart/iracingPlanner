import {Component} from '@angular/core';
import {CarService} from '../../services/car/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent {

  cars: Car[] = this.carService.getCars();

  constructor(private carService: CarService) {
  }

}
