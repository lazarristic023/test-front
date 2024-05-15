import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { Requestt } from '../model/requestt.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8081/api'; // prilagodite URL-u vašeg backend-a

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  registerClient(client: Client): Observable<Client> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Client>(`${this.apiUrl}/client/register`, client);
  }

  sendRequest(username: string): Observable<Requestt> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<Requestt>(`${this.apiUrl}/requests/create/` + username, null);
  }

  
}
