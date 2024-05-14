import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Employee } from '../model/employee.model';

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
    return this.http.get<Employee>('http://localhost:8081/api/authentication/getUserById/'+id ,{headers});
  }

  updateEmployee(employee:Employee): Observable<Employee> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Employee>('http://localhost:8081/api/authentication/updateEmployee',employee,{headers});
  }
}
