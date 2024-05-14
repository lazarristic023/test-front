import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/authentication/auth.service';
import { RequestService } from 'src/app/requests/request.service';
import { Requestt } from 'src/app/model/requestt.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  role: String = ""
  emailChecked: boolean = false
  request!: Requestt
  constructor(private authService: AuthService, private router: Router, private requestService: RequestService) { }
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  LogIn() {
    const user: any = {
      username: this.userForm.value.username || '',

      password: this.userForm.value.password || '',
    };
    this.authService.login(user).subscribe({
      next: (res) => {
        console.log('successfull', res)



        const id = this.authService.getUserId();
        this.role = this.authService.getUserRole();
        if (this.role == "CLIENT") {
          console.log('clieent')
            if(this.isEmailChecked(id)){
              this.router.navigate(['home']);
            }else{
              alert("You cannot login")
            }

        } else {
          console.log('nije klijent')
          this.router.navigate(['home']);
        }


      },
      error: (err) => {
        console.log('greska', err)
      }




    });


  }


  isEmailChecked(id: number): Boolean {

    this.authService.isEmailChecked(id).subscribe({
      next: (res) => {
        this.emailChecked = res as boolean
      }
    })

    if (this.emailChecked) {
      return true
    } else {
      return false
    }
  }

}
