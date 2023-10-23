import {Component, Input, OnInit} from '@angular/core';
import {CarService} from '../../../services/car/car.service';
import {Car} from "../../../interfaces/Car";
import {CarAssetService} from "../../../services/carAsset/car-asset.service";
import {CarAsset} from "../../../interfaces/CarAsset";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  @Input()
  car: Car = {};

  carAsset: CarAsset = {};
  checked = false;

  constructor(private carService: CarService, private carAssetService: CarAssetService) { }

  ngOnInit(): void {
    if (this.car.car_id) {
      this.checked = this.carService.isOwned(this.car);
      this.car.favorite = this.carService.isFavorite(this.car);
      this.carAsset = this.carAssetService.getAssetFor(this.car.car_id);
    }
  }

  onClick(car: Car) {
    if (this.checked) {
      this.carService.remove(car);
    } else {
      this.carService.save(car);
    }
  }

  favorite(favorite: boolean) {
    this.car.favorite = favorite;
    this.carService.save(this.car);
  }

  getCarImageUrl(): string {
    return `https://images-static.iracing.com/${this.carAsset.folder}/${this.carAsset.small_image}`;
  }
}
