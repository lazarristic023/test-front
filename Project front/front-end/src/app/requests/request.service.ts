import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    
  }

  getRequests(): Observable<Request[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Request[]>('http://localhost:8081/api/requests/getAll' ,{headers});
  }

  acceptRequest(request:Request): Observable<Request> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Request>('http://localhost:8081/api/requests/accept',request ,{headers});
  }

  rejectRequest(request:Request,reason:String): Observable<Request> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put<Request>('http://localhost:8081/api/requests/reject/'+reason,request ,{headers});
  }
}
