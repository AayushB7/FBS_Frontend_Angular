// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-booking',
//   templateUrl: './booking.component.html',
//   styleUrls: ['./booking.component.css']
// })
// export class BookingComponent {
//   passengerName: string="";
//   email: string="";
//   phoneNumber: string="";
//   age: number=0;
//   gender: string="";
//   cabinClass: string="";
//   noOfTicket: number=0;
//   flightId: number=0;

//   row:any;

//   private routeSubscription!: Subscription;
//   authService: any;
//   constructor(private route:ActivatedRoute, private auth:AuthService, private router:Router){}

//   ngOnInit() {
//     this.routeSubscription = this.route.queryParamMap.subscribe(params => {
//       this.flightId = Number(params.get('id'));
//     });
//       // alert(this.journeyId);
//       this.auth.getFlightById(this.flightId).subscribe({
//         next:(res)=>{
//           this.row=res;
//         },
//         error:(err)=>{
//           this.row=null;
//           // Swal.fire({
//           //   title: 'Error!',
//           //   text: err?.error.message,
//           //   icon: 'error',
//           //   confirmButtonText: 'Ok'
//           // });
//         }
//       });
//    }

//    onSubmit() {
//     console.log(this.passengerName + " " + this.email + " " + this.phoneNumber + " " + this.age + " " + this.gender + " " + this.cabinClass + " " + this.noOfTicket + " " + this.flightId);
//     this.auth.booking(this.flightId, {
//       passengerName: this.passengerName,
//       email: this.email,
//       phoneNumber: this.phoneNumber,
//       age: this.age,
//       gender: this.gender,
//       cabinClass: this.cabinClass,
//       noOfTicket: this.noOfTicket,
//       flightId: this.flightId
//     }).subscribe({
//       next: (res) => {
//         // Swal.fire({
//         //   title: 'Success!',
//         //   text: "Your Ticket is Booked Successfully! - SeatNo: "+res.seatNo+", Airline: "+res.airline+", Booking ID: "+res.bookingId,
//         //   icon: 'success',
//         //   confirmButtonText: 'Ok'
//         // });
//         this.router.navigate(["/home"]);
//       },
//       error: (err) => {
//         // Swal.fire({
//         //   title: 'Error!',
//         //   text: err?.error.message,
//         //   icon: 'error',
//         //   confirmButtonText: 'Ok'
//         // });
//       }
//     });
//   }
// }




import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  passengerName: string = "";
  email: string = "";
  phoneNumber: string = "";
  age: number = 0;
  gender: string = "";
  cabinClass: string = "";
  noOfTicket: number = 0;
  flightId: number = 0;

  row: any;

  private routeSubscription!: Subscription;
  authService: any;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.routeSubscription = this.route.queryParamMap.subscribe(params => {
      this.flightId = Number(params.get('id'));
    });

    this.auth.getFlightById(this.flightId).subscribe({
      next: (res) => {
        this.row = res;
      },
      error: (err) => {
        this.row = null;
      }
    });
  }

  onSubmit() {
    console.log(this.passengerName + " " + this.email + " " + this.phoneNumber + " " + this.age + " " + this.gender + " " + this.cabinClass + " " + this.noOfTicket + " " + this.flightId);

    this.auth.booking(this.flightId, {
      passengerName: this.passengerName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      age: this.age,
      gender: this.gender,
      cabinClass: this.cabinClass,
      noOfTicket: this.noOfTicket,
      flightId: this.flightId
    }).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Handle error
      }
    });
  }
}
