import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RefreshTokenRequest } from 'src/app/model/refreshTokenRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token: string | null = null;
  private refresh_token: string | null = null;
  private userClaims: any | null = null;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.userClaims = this.jwtHelper.decodeToken();
    if (this.userClaims) this.loginSource.next(true);

    this.access_token = localStorage.getItem('access_token');
    this.refresh_token = localStorage.getItem('refresh_token');
  }

  login(loginRequest: Credential): Observable<any> {
    console.log('u servisu', loginRequest);
    return this.http
      .post<any>('http://localhost:8081/api/authentication/login', loginRequest)
      .pipe(
        tap((res) => {
          console.log('Login success');
          console.log(res);
          this.storeTokens(res.access_token, res.refresh_token);
          this.userClaims = this.jwtHelper.decodeToken();
          console.log('userclaims', this.userClaims);
          this.loginSource.next(true);
        })
      );
  }
  
  logout(): void {
    localStorage.clear();
    this.loginSource.next(false);
  }

  isLogged(): boolean {
    return !!this.access_token && !this.jwtHelper.isTokenExpired(this.access_token);
  }

  getUserRole(): string {
    return this.userClaims?.role || '';
  }

  getUserId(): number {
    return this.userClaims?.id || 0;
  }

  getUsername(): string {
    return this.userClaims?.username || '';
  }

  getAccessToken(): string | null {
    return this.access_token;
  }

  refreshTokenIfNeeded(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        tap(() => {
          this.refreshTokenSubject.next(null);
        })
      );
    } else {
      if (this.access_token && this.jwtHelper.isTokenExpired(this.access_token)) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        console.log("Mijenjano: ");
        return this.http.post<any>('http://localhost:8081/api/authentication/refresh-token', {
          refreshToken: this.refresh_token,
          username: this.getUsername(),
          password: 'password'
        }).pipe(
          
          tap((res) => {
            this.storeTokens(res.access_token, res.refresh_token);
            this.refreshTokenInProgress = false;
            console.log("Mijenjano: ",res);
          })
        );
      } else {
        return this.refreshTokenSubject;
      }
    }
  }

  private storeTokens(access_token: string, refresh_token: string): void {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
