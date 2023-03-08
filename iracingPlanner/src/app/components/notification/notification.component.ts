import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../services/application/application.service";
import { compareVersions } from 'compare-versions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  updateAvailable: boolean = false;

  constructor(private appService: ApplicationService) {
  }

  ngOnInit(): void {
    const currentVersion = this.appService.getCurrentVersion();
    this.appService.getLatestVersion().then(res => {
      if (res && compareVersions(res.tag_name, currentVersion) > 0) {
        this.updateAvailable = true;
      }
    }, () => {

    });
  }
}
