import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  @Input()
  item: any;

  @Output()
  clickEvent = new EventEmitter<boolean>();

  icon = faStar

  ngOnInit(): void {
    if (this.item?.favorite) {
      this.icon = faStar;
    } else {
      this.icon = faStarRegular;
    }
  }

  onClick(): void {
    if (this.icon === faStarRegular) {
      this.icon = faStar;
    } else {
      this.icon = faStarRegular;
    }
    this.clickEvent.emit(this.icon === faStar);
  }

}
