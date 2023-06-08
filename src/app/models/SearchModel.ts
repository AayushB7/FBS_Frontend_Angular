export class SearchModel {
    Id: number;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
  
    constructor(Id: number, departureAirport: string, arrivalAirport: string, departureTime: string) {
      this.Id = Id;
      this.departureAirport = departureAirport;
      this.arrivalAirport = arrivalAirport;
      this.departureTime= departureTime;
    }
  }
  