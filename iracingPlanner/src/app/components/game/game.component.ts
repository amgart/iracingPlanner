import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../services/store/store.service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  clicks: number = 0;
  saved: boolean = true;
  constructor(private electronStoreService: StoreService) { }

  ngOnInit(): void {
    this.clicks = this.electronStoreService.get("clicks");
  }

  addClicks = (): void => {
    this.clicks++;
    this.saved = false;
  }

  save = (): void => {
    this.electronStoreService.set("clicks", this.clicks);
    this.saved = true;
  }

}
