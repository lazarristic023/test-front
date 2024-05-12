import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8081/api'; // prilagodite URL-u vašeg backend-a

  constructor(private http: HttpClient) { }

  registerClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/client/register`, client);
  }

}
