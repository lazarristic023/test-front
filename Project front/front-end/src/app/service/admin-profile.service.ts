import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Company } from '../model/company.model';
import { Administrator } from '../model/administrator.model';
import { Employee } from '../model/employee.model';
import { Alert } from '../model/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  //private apiUrl = 'http://localhost:8081/api';
  private apiUrl = 'https://localhost:8081/api';


  getAllEmployees(): Observable<User[]> {
    console.log("Usao u employees")
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<User[]>('http://localhost:8081/api/users/getAllEmployees' ,{headers});
  }

  getAllClients(): Observable<User[]> {
    console.log("Usao u clinents")
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<User[]>('http://localhost:8081/api/client/getAllClients' ,{headers});
  }

  getAllCompanies(): Observable<Company[]> {
    console.log("Usao u clinents")
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Company[]>('http://localhost:8081/api/users/getAllCompanies' ,{headers});
  }
  
  getAdminById(id: number): Observable<Administrator> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Administrator>('http://localhost:8081/api/users/getAdminById/'+id,{headers});
  }

    
  getEmployeeById(id: number): Observable<Employee> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Employee>('http://localhost:8081/api/users/getEmployeeById/'+id,{headers});
  }

  updateAdmin(admin: Administrator,id:number): Observable<any> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>('http://localhost:8081/api/users/editAdmin/'+id, admin,{headers});
  }

  updateEmployee(admin: Employee,id:number): Observable<any> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>('http://localhost:8081/api/users/editEmployee/'+id, admin,{headers});
  }

  registerAdmin(admin: Administrator): Observable<Administrator> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Administrator>(`${this.apiUrl}/users/registerAdmin`, admin,{headers});
  }

  registerEmployee(employee: Employee): Observable<Employee> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Employee>(`${this.apiUrl}/users/registerEmployee`, employee,{headers});
  }

  getAllUnreadAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alerts/get-all-unread`);
  }

  readAlert(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/alerts/read-alert/` + id, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error reading alert:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error);
        })
      );
  }
 
}
