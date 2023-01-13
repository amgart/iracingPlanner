import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private _router: Router) {
    this.navLinks = [
      {
        label: 'Dashboard',
        link: '/dashboard',
        index: 0
      }, {
        label: 'Cars',
        link: '/cars',
        index: 1
      }, {
        label: 'Tracks',
        link: '/tracks',
        index: 2
      },
      {
        label: 'About',
        link: '/about',
        index: 3
      }
    ];
  }

  ngOnInit(): void {
    this._router.events.subscribe(() => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this._router.url));
    });
  }
}
