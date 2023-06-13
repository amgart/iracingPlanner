import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../services/application/application.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  version = '';

  constructor(private appService: ApplicationService) {
  }

  ngOnInit() {
    this.version = this.appService.getCurrentVersion();
  }
}
