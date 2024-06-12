import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Employee } from '../model/employee.model';
import { Commercial } from '../model/commercial.model';
import { CommercialRequest } from '../model/commercial-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    
  }

  getEmployee(id:number): Observable<Employee> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Employee>('https://localhost:8081/api/authentication/getUserById/'+id ,{headers});
  }

  updateEmployee(employee:Employee): Observable<Employee> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Employee>('https://localhost:8081/api/authentication/updateEmployee',employee,{headers});
  }

  getCommercials(id:number): Observable<Commercial[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Commercial[]>('https://localhost:8081/api/commercial/getAll' ,{headers});
  }

  getCommercialsRequests(): Observable<CommercialRequest[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CommercialRequest[]>('https://localhost:8081/api/commercial-request/getAll' ,{headers});
  }

  createCommercial(com:Commercial): Observable<Commercial> {
    
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Commercial>('https://localhost:8081/api/commercial/create',com ,{headers});
  }

  updateCommercialRequest(com:CommercialRequest): Observable<CommercialRequest> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<CommercialRequest>('https://localhost:8081/api/commercial-request/accept',com ,{headers});
  }
}
