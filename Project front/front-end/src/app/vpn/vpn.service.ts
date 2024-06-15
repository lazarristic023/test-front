import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VPNService {
 

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  fetchVPNMessage(): Observable<String> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<String>('https://localhost:8081/api/authentication/fetch-message' ,{headers});
  }
}
