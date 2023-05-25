export class BookingModel {
    passengerName: string;
    email: string;
    phoneNumber: string;
    age: number;
    gender: string;
    cabinClass: string;
    noOfTicket: number;
  
    constructor(passengerName: string, email: string, phoneNumber: string, age: number, gender: string, cabinClass: string, noOfTicket:number) {
      this.passengerName = passengerName;
      this.email = email;
      this.phoneNumber= phoneNumber;
      this.age= age;
      this.gender= gender;
      this.cabinClass= cabinClass;
      this.noOfTicket= noOfTicket;
    }
  }
  