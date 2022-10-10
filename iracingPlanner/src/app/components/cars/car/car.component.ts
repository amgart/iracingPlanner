import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../services/util/util.service';
import {CarService} from '../../../services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  @Input()
  car: Car = {};

  checked = false;

  constructor(private utilService: UtilService, private carService: CarService) { }

  ngOnInit(): void {
    if (this.car.car_id) {
      this.checked = this.carService.isOwned(this.car);
    }
  }

  getLabel(car: Car): string {
    if (car.car_name) {
      return this.utilService.decode(car.car_name);
    }
    return '';
  }

  onClick(car: Car) {
    if (this.checked) {
      this.carService.remove(car);
    } else {
      this.carService.save(car);
    }
  }

}
