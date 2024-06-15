import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/authentication/auth.service';
import { ClientService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogged : boolean=false
  userRole: string = '';
  isDeleted : number=0;
  userId : number =0;

  constructor(
    private router: Router,
    private authService: AuthService ,
    private clientService: ClientService
  ) {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      
      
        if (this.isLogged) {
          this.userRole = this.authService.getUserRole()
          this.userId = this.authService.getUserId()
          console.log("USER ROLE : ",this.userRole);

        }
      
        
      
    });

    
  }
  ngOnInit(): void {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      console.log('isLogged', this.isLogged)
      
     
    });

    
  }

  deleteData(){
    this.clientService.deleteClientData(this.userId).subscribe(
      (res) => {
        if(res == 1){
            alert("You successifuly deleted your data!");
            this.router.navigate(['login']);
        }else{
          alert("You cant delete your data, becuase package is not gold!");

        }
     
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
