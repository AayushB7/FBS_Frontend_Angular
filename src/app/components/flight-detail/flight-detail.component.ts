import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent {

  id!:number;

  flightNumber!:string;
  departureAirport!: string;
  arrivalAirport!: string;
  departureTime!: Date;
  arrivalTime!: Date;
  price!: number;
  flightData:any;

  currentDate:string = new Date().toISOString().slice(0,16);


  resultArray!:any;
  // userName:string="";
  constructor(private auth: AuthService, private userData:UserdataService){}

  GetAllFlights(){
    this.auth.GetAllFlights().subscribe({
      next:(res)=>{
        this.resultArray=res;
        // if(res==null || res.length==0){
        //   Swal.fire({
        //     title: 'Error!',
        //     text: "No Any Flight To Show!",
        //     icon: 'error',
        //     confirmButtonText: 'Ok'
        //   });
        // }
      },
      error:(err)=>{alert(err?.error.message);
        // Swal.fire({
        //   title: 'Error!',
        //   text: err?.error.message,
        //   icon: 'error',
        //   confirmButtonText: 'Ok'
        // });
      }
    });
  }

  ngOnInit(){
    // this.userData.getUsernameFromStore().subscribe(val=>{
    //   let userNameFromToken=this.auth.getUsernameFromToken();
    //   this.userName=val || userNameFromToken;
    //   this.airlineName=val || userNameFromToken;
    // });
    this.GetAllFlights();
  }

  deleteFlight(id:number){
    // Swal.fire({
    //   title: "Do you want to delete?",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes',
    //   denyButtonText: 'No',
    //   customClass: {
    //     actions: 'my-actions',
    //     cancelButton: 'order-1 right-gap',
    //     confirmButton: 'order-2',
    //     denyButton: 'order-3',
    //   }
    // })
    // .then((result) => {
      if (confirm("Do you want to delete")) {
        this.auth.deleteFlight(id).subscribe({
          next:(res)=>{
            alert('Deleted! success')
            this.GetAllFlights();
          },
          error:(err)=>{
            alert(err?.error.message);
            // Swal.fire({
            //   title: 'Error!',
            //   text: err?.error.message,
            //   icon: 'error',
            //   confirmButtonText: 'Ok'
            // });
          }
        });
      } else
      {
        alert('Deletetion Cancelled!');
      }
    // });
  }

  editFlightClicked(id:number){
    this.auth.getFlightById(id).subscribe({
      next:(res)=>{
        this.flightData=res;
        this.id=this.flightData.journeyId;
        this.flightNumber = this.flightData.flightNumber;
        this.departureAirport =this.flightData.departureAirport;
        this.arrivalAirport =this.flightData.arrivalAirport;
        this.departureTime =this.flightData.departureTime;
        this.arrivalTime =this.flightData.arrivalTime;
        this.price =this.flightData.price;
      },
      error:(err)=>{
        // Swal.fire({
        //   title: 'Error!',
        //   text: err?.error.message,
        //   icon: 'error',
        //   confirmButtonText: 'Ok'
        // });
      }
    });
  }

  editFlight(){
    if(this.flightNumber == null ||
      this.departureAirport == null ||
      this.arrivalAirport == null ||
      this.departureTime == null ||
      this.arrivalTime == null ||
      this.price == null ||
      this.flightNumber=="" ||
      this.departureAirport=="" ||
      this.arrivalAirport==""){
        alert("Error!");
      }
      else{
        this.auth.updateFlight({
          id:this.id,
          flightNumber:this.flightNumber,
          departureAirport:this.departureAirport,
          arrivalAirport:this.arrivalAirport,
          departureTime:this.departureTime,
          arrivalTime:this.arrivalTime,
          price:this.price
        }).subscribe({
          next:(res)=>{
            alert("Success!");
            document.getElementById("updateFlightModalClose")?.click();
            this.flightNumber = "";
            this.departureAirport = "";
            this.arrivalAirport = "";
            this.departureTime = new Date();
            this.arrivalTime = new Date();
            this.price = 0;
            this.GetAllFlights();
          },
          error:(err)=>{
            // Swal.fire({
            //   title: 'Error!',
            //   text: err?.error.message,
            //   icon: 'error',
            //   confirmButtonText: 'Ok'
            // });
          }
        });
      }
  }

  addFlight(){
    alert("Called");
    if(
      this.flightNumber==null ||
      this.departureAirport == null ||
      this.arrivalAirport == null ||
      this.departureTime == null ||
      this.arrivalTime == null ||
      this.price == null ||
      this.flightNumber=="" ||
      this.departureAirport=="" ||
      this.arrivalAirport==""){
        alert("Error!");
        alert("message");
      }
      else{
        this.auth.addFlight({
          flightNumber:this.flightNumber,
          departureAirport:this.departureAirport,
          arrivalAirport:this.arrivalAirport,
          departureTime:this.departureTime,
          arrivalTime:this.arrivalTime,
          price:this.price


        }).subscribe({
          next:(res)=>{
            alert("Success!");
            document.getElementById("addFlightModalClose")?.click();

            this.flightNumber == "";
            this.departureAirport = "";
            this.arrivalAirport = "";
            this.departureTime = new Date();
            this.arrivalTime = new Date();
            this.price = 0;
            this.GetAllFlights();
          },
          error:(err)=>{
            // Swal.fire({
            //   title: 'Error!',
            //   text: err?.error.message,
            //   icon: 'error',
            //   confirmButtonText: 'Ok'
            // });
          }
        });
      }
  }
}
