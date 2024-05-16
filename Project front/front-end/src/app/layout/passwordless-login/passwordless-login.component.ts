import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.css']
})
export class PasswordlessLoginComponent {

  constructor(private authService:AuthService){
    localStorage.clear();
  }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required])
  });

  sendLoginLink(){

    const email = this.userForm.value.email as string
    this.authService.sendLoginLink(email).subscribe({
      next: (res) => {
        console.log('Successfully sent a link', res)

        alert("Successfuly sent an login link on email " + email)
      },
      error: (err) => {
        console.log('Error sending login link', err)
        alert('Email is either incorect or you do not meet requirements for this feature')
      }
    });
  }
}
