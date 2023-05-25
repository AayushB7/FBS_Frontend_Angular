export class SearchModel {
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
  
    constructor(departureAirport: string, arrivalAirport: string, departureTime: string) {
    
      this.departureAirport = departureAirport;
      this.arrivalAirport = arrivalAirport;
      this.departureTime= departureTime;
    }
  }
  