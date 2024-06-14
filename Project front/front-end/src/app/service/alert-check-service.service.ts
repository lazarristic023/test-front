import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdminProfileService } from './admin-profile.service';
import { AlertService } from './alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class AlertCheckService {
  
    mes : string = "";
    i: number = -1;

    constructor(
    private adminProfileService: AdminProfileService,
    private alertService: AlertService
  ) {}

  startCheckingForAlerts() {
    interval(60000) // Proveravaj svakih 60 sekundi
      .pipe(
        switchMap(() => this.adminProfileService.getAllUnreadAlerts())
      )
      .subscribe(alerts => {
        alerts.forEach(alert => {
            if(alert.message !== undefined) {
                this.mes = alert.message;
            }
            if(alert.id !== undefined) {
                this.i = alert.id;
            }
            this.alertService.showSnackbar(this.mes);
            this.markAlertAsSeen(this.i); // Obeleži kao pročitano
        });
      });
  }

  private markAlertAsSeen(alertId: number) {
    // Implementiraj logiku za obeležavanje upozorenja kao pročitano, ako je potrebno
    this.adminProfileService.readAlert(alertId);
  }
}
