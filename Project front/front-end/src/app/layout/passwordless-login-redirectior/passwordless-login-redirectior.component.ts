import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';

@Component({
  selector: 'app-passwordless-login-redirectior',
  templateUrl: './passwordless-login-redirectior.component.html',
  styleUrls: ['./passwordless-login-redirectior.component.css']
})
export class PasswordlessLoginRedirectiorComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear()
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        // Call a service method to exchange token for access and refresh tokens
        this.authService.passwordlessLogin(token).subscribe(
          response => {
            console.log("USLO")
            const accessToken = response.headers.get('Access-Token');
            const refreshToken = response.headers.get('Refresh-Token');
            
            // Store tokens or handle them as needed, e.g., store in localStorage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            this.authService.setUserClaims();
            this.authService.setAccessToken(accessToken);
            this.authService.setLoginSource(true);

            // Redirect user to home page or any other desired location
            this.router.navigateByUrl('/home');
          },
          error => {
            console.log("Error with passwordless login:")
            console.log(error);
            this.authService.logout();
            this.router.navigateByUrl('/login');
          }
        );
      }
    });
  }
}
