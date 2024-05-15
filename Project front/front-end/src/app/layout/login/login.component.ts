import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/authentication/auth.service';
import { Role, User } from 'src/app/model/user.model';
import { Administrator } from 'src/app/model/administrator.model';
import { Employee } from 'src/app/model/employee.model';
import { AdminProfileService } from 'src/app/service/admin-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router,private service:AdminProfileService){
    localStorage.clear();
  }
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  user:User={
    id: 0,
    username: '',
    email: '',
    password: '',
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: ''
  }
  admin:Administrator={
    isPredefined: false,
    firstName: '',
    lastName: '',
    firstLogging: false,
    id: 0,
    username: '',
    email: '',
    password: '',
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
    username: '',
    email: '',
    password: '',
    role: Role.EMPLOYEE,
    emailChecked: false,
    city: '',
    country: '',
    phone: ''
  }

  

  LogIn() {
    const user: any = {
      username: this.userForm.value.username || '',

      password: this.userForm.value.password || '',
    };
    this.authService.login(user).subscribe( {
      next:(res)=>{
          console.log('successfull',res)
          if(this.authService.getUserRole()[0] == 'ADMINISTRATOR' ){
            this.loadAdminData()
          }else if(this.authService.getUserRole()[0] == 'EMPLOYEE'){
              this.loadEmployeeData();
          }
          this.router.navigate(['home'])
      },
      error:(err)=>{
        console.log('greska',err)
      }
      
     
     
    
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
}
