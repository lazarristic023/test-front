import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Requestt } from '../model/requestt.model';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    
  }

  getRequests(): Observable<[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<[]>('http://localhost:8081/api/requests/getAll' ,{headers});
  }

  acceptRequest(request:Requestt): Observable<Requestt> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Requestt>('http://localhost:8081/api/requests/accept',request ,{headers});
  }

  rejectRequest(request:Requestt,reason:String): Observable<Requestt> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Requestt>('http://localhost:8081/api/requests/reject/'+reason,request ,{headers});
  }

  getRequestByClientId(id:number): Observable<Requestt> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Requestt>('http://localhost:8081/api/requests/getByClientId/'+id ,{headers});
  }
  
}
