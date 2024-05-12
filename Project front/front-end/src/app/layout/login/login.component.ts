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

  role:String=""

  request!:Requestt
  constructor(private authService:AuthService,private router:Router,private requestService:RequestService){}
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  LogIn() {
    const user: any = {
      username: this.userForm.value.username || '',

      password: this.userForm.value.password || '',
    };
    this.authService.login(user).subscribe( {
      next:(res)=>{
          console.log('successfull',res)

      
         if(this.canUserLogin()){
            this.router.navigate(['home']);
          }

          const id=this.authService.getUserId();
    this.role=this.authService.getUserRole();
    if(this.role=="CLIENT"){
      console.log('clieent')
      //ako je zahtjev odbijen ne moze se logovati
      this.requestService.getRequestByClientId(id).subscribe({
        next:(res)=>{
        this.request=res
          console.log(res)
          if(res!=null){
           if(this.request.status=="ACCEPTED"){
            alert('Request accepted')
            this.router.navigate(['home']);
           }else{
            alert('Request rejected')
           
           }
          }else{
            alert("Request never created")
           
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }else{
      console.log('nije klijent')
      this.router.navigate(['home']);
    }
         
          
      },
      error:(err)=>{
        console.log('greska',err)
      }
      
     
     
    
    });


  }

  canUserLogin():boolean{
    const id=this.authService.getUserId();
    this.role=this.authService.getUserRole();
    if(this.role=="CLIENT"){
      console.log('clieent')
      //ako je zahtjev odbijen ne moze se logovati
      this.requestService.getRequestByClientId(id).subscribe({
        next:(res)=>{
        this.request=res
          console.log(res)
          if(res!=null){
           if(this.request.status=="ACCEPTED"){
            alert('Request accepted')
            return true;
           }else{
            alert('Request rejected')
            return false
           }
          }else{
            alert("Request never created")
            return false;
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }else{
      console.log('nije klijent')
      return true;
    }

    return false;
  }

}
