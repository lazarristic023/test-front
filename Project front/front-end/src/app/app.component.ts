import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertCheckService } from './service/alert-check-service.service';
import { AuthService } from './infrastructure/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'front-end';

  constructor(private alertCheckService: AlertCheckService, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.getUserRole() == 'ADMINISTRATOR' && this.authService.loginObserver) {
      this.alertCheckService.startCheckingForAlerts();
    }
  }
  
}
