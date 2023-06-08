import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { AuthGuard1 } from './Guards/auth.guard';
import { AuthGuard2 } from './Guards/signedin.guard';
import { AuthGuardAdmin } from './Guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
// import { AuthGuardAirline } from './Guards/airlineguard.guard';
import { AuthGuardFlight } from './Guards/flight.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent, canActivate:[AuthGuard2]},
  {path:'signup',component:SignupComponent, canActivate:[AuthGuard2]},
  {path:'search',component:SearchComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component:HomeComponent},
  {path: 'booking/:1', component: BookingComponent, canActivate: [AuthGuard1]},
  {path: 'admin', component: AdminComponent},
  {path: 'flight-detail', component: FlightDetailComponent, canActivate:[AuthGuardFlight]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
