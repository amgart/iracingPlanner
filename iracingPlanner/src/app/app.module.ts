import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {CarsComponent} from './components/cars/cars.component';
import {CarComponent} from './components/cars/car/car.component';
import {TracksComponent} from './components/tracks/tracks.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AboutComponent} from './components/about/about.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {TrackComponent} from './components/tracks/track/track/track.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {LoginComponent} from './components/login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {NotificationComponent} from './components/notification/notification.component';
import {FavoriteComponent} from './components/favorite/favorite.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarComponent,
    TracksComponent,
    DashboardComponent,
    AboutComponent,
    TrackComponent,
    LoginComponent,
    NotificationComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    FontAwesomeModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
