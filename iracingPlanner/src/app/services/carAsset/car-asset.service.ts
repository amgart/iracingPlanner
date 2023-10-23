import { Injectable } from '@angular/core';
import carAssetsJsonFile from "../../../assets/carAssets.json";
import {CarAsset} from "../../interfaces/CarAsset";

@Injectable({
  providedIn: 'root'
})
export class CarAssetService {

  constructor() { }

  getAssetFor(carId: number): CarAsset {
    return JSON.parse(JSON.stringify(carAssetsJsonFile))[carId.toString()];
  }
}
