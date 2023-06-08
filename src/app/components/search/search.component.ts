import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  departureAirport: string = "";
  arrivalAirport: string = "";
  departureTime: string = "";
  currentDate: string = new Date().toISOString().slice(0, 10);
  resultArray!:any[];
  responseStatusCode!:number;
  searchForm! :FormGroup;
  errorMessage: string = "";

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { 
    this.searchForm=this.fb.group({
      departureAirport:['',Validators.required],
      arrivalAirport:['',Validators.required],
      departureTime:['',Validators.required]
    })
  }
  onSubmit() {
    if (this.departureAirport.trim() === "" || this.arrivalAirport.trim() === "" || this.departureTime.trim() === "") {
      alert("Please enter all the details!");
      return;
    }
  
    console.log(this.departureAirport + " " + this.arrivalAirport + " " + this.departureTime);
    this.authService.search({
      departureAirport: this.departureAirport,
      arrivalAirport: this.arrivalAirport,
      departureTime: this.departureTime
    }).subscribe(
      (res: any[]) => {
        this.resultArray = res;
        if (this.resultArray.length === 0) {
          this.errorMessage = "No flights found.";
        } else {
          this.errorMessage = ""; // Clear the error message if flights are found
        }
      },
      (err) => {
        this.resultArray = [];
        this.errorMessage = err?.error?.message || "No Flights Found.";
          
        }
      );
  }
  // bookBtn(Id: number){
  //   this.router.navigate([`booking/1`]);
  // }
  bookBtn(Id: number) {
    this.router.navigate([`booking/1`]);
  }

}
