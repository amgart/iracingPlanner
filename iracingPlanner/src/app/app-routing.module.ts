import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CarsComponent} from './components/cars/cars.component';
import {AboutComponent} from './components/about/about.component';
import {TracksComponent} from './components/tracks/tracks.component';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "cars", component: CarsComponent },
  { path: "tracks", component: TracksComponent },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
