import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Client } from '../model/client.model';
import { Requestt } from '../model/requestt.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Commercial } from '../model/commercial.model';
import { CommercialRequest } from '../model/commercial-request.model';

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

  updateName(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/clientFirmName/` + id + `/` + name, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating name:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error);
        })
      );
  }

  updateSurname(id: number, surname: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/surnameFirmPIB/` + id + `/` + surname, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating surname:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
  }

  updateAddress(id: number, address: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/firmResidentialAddress/` + id + `/` + address, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating address:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
  }

  updateCity(id: number, city: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/city/` + id + `/` + city, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating city:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
  }

  updateCountry(id: number, country: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/country/` + id + `/` + country, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating country:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
  }

  updatePhone(id: number, phone: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/phone/` + id + `/` + phone, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating phone:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
  }

  updateEmail(id: number, email: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/email/` + id + `/` + email, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating email:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
  }

  updateUsername(id: number, username: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/client/username/` + id + `/` + username, null)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating username:', error);
          // Možete ovde dodati logiku za prikazivanje greške korisniku
          return throwError(error); // Ponovno emitovanje greške kako bi se propustila niz lanac observable-a
        })
      );
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
