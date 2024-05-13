import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { Requestt } from '../model/requestt.model';
import { Commercial } from '../model/commercial.model';
import { CommercialRequest } from '../model/commercial-request.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8081/api'; // prilagodite URL-u vašeg backend-a

  constructor(private http: HttpClient) { }

  registerClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/client/register`, client);
  }

  sendRequest(username: string): Observable<Requestt> {
    return this.http.post<Requestt>(`${this.apiUrl}/requests/create/` + username, null);
  }

  updateName(id: number, name: string): void {
    this.http.post<Requestt>(`${this.apiUrl}/client/clientFirmName/` + id + `/` + name, null);
  }

  updateSurname(id: number, surname: string): void {
    this.http.post<void>(`${this.apiUrl}/client/surnameFirmPIB/` + id + `/` + surname, null);
  }

  updateAddress(id: number, address: string): void {
    this.http.post<void>(`${this.apiUrl}/client/firmResidentialAddress/` + id + `/` + address, null);
  }

  updateCity(id: number, city: string): void {
    this.http.post<void>(`${this.apiUrl}/client/city/` + id + `/` + city, null);
  }

  updateCountry(id: number, country: string): void {
    this.http.post<void>(`${this.apiUrl}/client/country/` + id + `/` + country, null);
  }

  updatePhone(id: number, phone: string): void {
    this.http.post<void>(`${this.apiUrl}/client/phone/` + id + `/` + phone, null);
  }

  updateEmail(id: number, email: string): void {
    this.http.post<void>(`${this.apiUrl}/client/email/` + id + `/` + email, null);
  }

  getClientData(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/get-by/` + id);
  }

  getClientCommercials(clientId: number): Observable<Commercial[]> {
    return this.http.get<Commercial[]>(`${this.apiUrl}/commercial/get-by/` + clientId);
  }

  sendCommercialRequest(request: CommercialRequest): Observable<CommercialRequest> {
    return this.http.post<CommercialRequest>(`${this.apiUrl}/commercial-request/create`, request);
  }

}
