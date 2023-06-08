import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7176/api/";
  private userPayload:any;
  constructor(private http : HttpClient,  private router: Router) { }

  signup(userObj:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Authenticate/register`,userObj)
  }
  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Authenticate/login`, loginObj);
  }
  search(searchObj: any): Observable<any[]> {
    const headers = this.getAuthorizationHeaders();
    const params = { ...searchObj }; // You can modify this if needed
    return this.http.get<any[]>(`${this.baseUrl}Search`, { headers, params });
  }
  booking(Id: number, bookObj: any): Observable<any> {
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Booking/1`, bookObj, { headers });
  }

  adminhome(adminObj:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Authenticate/register-admin`, adminObj);
  }


  // booking(bookObj:any, id: number): Observable<any> {
  //   const headers = this.getAuthorizationHeaders();
  //   return this.http.post<any>(`${this.baseUrl}Booking/id?id=${id}`, bookObj, {headers});
  // }

  setToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  isLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }

  signOut(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }


  getFlightById(flightId: number) {
    const url = `${this.baseUrl}FlightDetail/${flightId}`;

    return this.http.get(url);
  }
  // getFlightById(id:number){
  //   return this.http.get(`${this.baseUrl}Booking/${id}`);
  // }

  addAdmin (adminObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/register-admin`, adminObj);
  }

  GetAllFlights(){
    return this.http.get(`${this.baseUrl}Admin/flights`);
  }

  deleteFlight(id: number){
    return this.http.delete(`${this.baseUrl}FlightDetail/${id}`);
  }

  addFlight(flightObj:any){
    return this.http.post<any>(`${this.baseUrl}FlightDetail`, flightObj);
  }

  updateFlight(flightObj:any){
    return this.http.put(`${this.baseUrl}FlightDetail`, flightObj);
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token!);
  }

  getUserIdFromToken(){
    if(this.userPayload){
      return this.userPayload["jti"];
    }
  }

  getUsernameFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }
  }

  getEmailFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  }

}


