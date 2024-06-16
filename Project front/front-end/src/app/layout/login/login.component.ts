import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/authentication/auth.service';
import { RequestService } from 'src/app/requests/request.service';
import { Requestt } from 'src/app/model/requestt.model';
import { Role, User } from 'src/app/model/user.model';
import { Administrator } from 'src/app/model/administrator.model';
import { Employee } from 'src/app/model/employee.model';
import { AdminProfileService } from 'src/app/service/admin-profile.service';
import { UserTokenState } from 'src/app/model/userTokenState.model';
import { TfaCodeVerificationRequest } from 'src/app/model/tfaCodeVerificationRequest.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router,private service:AdminProfileService){
    localStorage.clear();
  }

  role: String = ""
  emailChecked: boolean = false
  request!: Requestt
  otpCode: string = ''
  isTfaEnabled: boolean = false



  //constructor(private authService: AuthService, private router: Router, private requestService: RequestService) { }
  
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  user:User={
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    
    firstName: '',
    lastName: ''
  }

  admin:Administrator={
    isPredefined: false,
    firstName: '',
    lastName: '',
    firstLogging: false,
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: ''
  }

  employee:Employee={
    firstName: '',
    lastName: '',
    firstLogging: false,
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.EMPLOYEE,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    
    //company: undefined
  }

  

  LogIn() {
    const user: any = {
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
    };
    
    this.authService.login(user).subscribe({
      next: (userTokenState: UserTokenState) => {
        console.log('successful', userTokenState);
  
        if (userTokenState.tfaEnabled && !userTokenState.accessToken) {
          this.isTfaEnabled = true;
          return;
        }
  
        const id = this.authService.getUserId();
        this.role = this.authService.getUserRole();
        
        if (this.role == "CLIENT") {
          this.isEmailChecked(id, (emailChecked) => {
            if (emailChecked) {
              this.router.navigate(['home']);
            } else {
              alert("You cannot login, email not checked");
            }
          });
        } else if (this.role == "EMPLOYEE") {
          this.router.navigate(['captcha']);
        } else if (this.role == "ADMINISTRATOR") {
          this.loadAdminData();
        } else if (this.role == "EMPLOYEE") {
          this.loadEmployeeData();
        }
      },
      error: (err) => {
        console.log('error', err);
      }
    });
  }
  
  


  isEmailChecked(id: number, callback: (result: boolean) => void): void {
    this.authService.isEmailChecked(id).subscribe({
      next: (res) => callback(res as boolean),
      error: () => callback(false) // Handle error case if needed
    });
  }
  

  
  loadAdminData(): void {
    this.service.getAdminById(this.authService.getUserId()).subscribe({
      next: (data: Administrator) => {
        this.admin = data;
        console.log("Vraceni admin: ",this.admin);
        if(this.admin.firstLogging){
          this.router.navigate(['/changePassword']);
        }
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }


  
  
  loadEmployeeData(): void {
    this.service.getEmployeeById(this.authService.getUserId()).subscribe({
      next: (data: Employee) => {
        this.employee = data;
        console.log("Vraceni employee: ",this.employee);
        if(this.employee.firstLogging){
          this.router.navigate(['/changePassword']);
        }
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }

  verifyTfa() {
    const verifyRequest: TfaCodeVerificationRequest = {
      email: this.userForm.value.email as string,
      code: this.otpCode
    };
    this.authService.verifyTfaCode(verifyRequest)
      .subscribe({
        next: (response) => {

          localStorage.setItem('token', response.accessToken as string);
          localStorage.setItem('refreshToken', response.refreshToken as string);

          this.authService.setUserClaims();
          this.authService.setAccessToken(response.accessToken as string);
          this.authService.setLoginSource(true);
          this.router.navigate(['home']);
        }
      });
  }
}
