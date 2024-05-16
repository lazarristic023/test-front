import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { RefreshTokenRequest } from 'src/app/model/refreshTokenRequest.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token = null;
  userClaims: any = null;
  
  refreshTokenRequest:RefreshTokenRequest={
    refreshToken: '',
    username: '',
    password: ''
  }
  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  public passChangeSource = new BehaviorSubject<boolean>(false);
  public passChangeObserver = this.passChangeSource.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    //localStorage.clear();
    this.userClaims = this.jwtHelper.decodeToken();
    if (this.userClaims) this.loginSource.next(true);
  }

 

  login(loginRequest: Credential): Observable<boolean> {
    console.log('u servisu',loginRequest)
    return this.http
      .post<any>('http://localhost:8081/api/authentication/login', loginRequest)
      .pipe(
        map((res) => {
          console.log('Login success');
          console.log(res);
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken); 
          this.userClaims = this.jwtHelper.decodeToken();
          console.log('userclaims',this.userClaims)
          this.getUserId()
          this.getUsername()
          this.access_token = res.token;
          this.loginSource.next(true);
          return true;
        })
      );
  }

  passwordlessLogin(token: string): Observable<any> {
    // Make an HTTP request to the server to exchange the token for access and refresh tokens
    return this.http.get<any>('http://localhost:8081/api/authentication/passwordlessLogin', {
      params: {
        token: token
      },
      observe: 'response'
    });
  }

  logout(): void {
    localStorage.clear();
    this.loginSource.next(false);
  }

  isLogged(): boolean {
    if (!this.jwtHelper.tokenGetter()) return false;
    return true;
  }

  getUserRole(): string {
    return this.userClaims.role;
  }
  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getAccessToken() {
    return this.access_token;
  }

  
  getUserId(): number {
    console.log('id',this.userClaims.id)
    return this.userClaims.id;
  }

  getUsername(): string {
    console.log("ooooo",this.userClaims.username);
    return this.userClaims.username;
    
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<RefreshTokenRequest> {
    console.log("POzvana metoda");
    console.log("Refresh token", refreshTokenRequest.refreshToken);
    console.log("Access token", localStorage.getItem('token'));
    return this.http.post<RefreshTokenRequest>('http://localhost:8081/api/authentication/refresh-token', refreshTokenRequest);
  }
  
 
  getCurrentUser() {
    // Pretpostavimo da vraća podatke o trenutno ulogovanom korisniku
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  
  isEmailChecked(id:number): Observable<Boolean> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Boolean>('http://localhost:8081/api/authentication/isEmailChecked/'+ id ,{headers});
  }

  sendLoginLink(email: string): Observable<boolean> {
    const url = `http://localhost:8081/api/authentication/sendPasswordlessLoginLink?email=${encodeURIComponent(email)}`;
    return this.http.get<boolean>(url);
  }
  

 
}
