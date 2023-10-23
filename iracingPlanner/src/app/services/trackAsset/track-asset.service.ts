import { Injectable } from '@angular/core';
import {CarAsset} from "../../interfaces/CarAsset";
import trackAssetsJsonFile from "../../../assets/trackAssets.json";

@Injectable({
  providedIn: 'root'
})
export class TrackAssetService {

  constructor() { }

  getAssetFor(trackId: number): CarAsset {
    return JSON.parse(JSON.stringify(trackAssetsJsonFile))[trackId.toString()];
  }
}
