import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtHelperService,private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshTokenIfNeeded().pipe(
      switchMap(() => {
        // Dohvati ažurirani pristupni token
        const accessToken = this.authService.getAccessToken();

        // Dodaj pristupni token u zaglavlje zahtjeva
        if (accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        }

        // Nastavi s obradom zahtjeva
        return next.handle(request);
      })
    );
  }
}