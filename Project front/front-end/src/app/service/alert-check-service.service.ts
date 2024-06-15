import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, of } from 'rxjs';
import { concatMap, delay, switchMap } from 'rxjs/operators';
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
    interval(30000) // Proveravaj svakih 20 sekundi
      .pipe(
        switchMap(() => this.adminProfileService.getAllUnreadAlerts()), // Dobavi sve nepročitane alerte
        concatMap(alerts => of(...alerts).pipe( // Sekvencijalno obradi svaki alert
          concatMap(alert => {
            if (alert.message !== undefined) {
              this.mes = alert.message;
            }
            if (alert.id !== undefined) {
              this.i = alert.id;
            }
            this.alertService.showSnackbar(this.mes, 'Mark as read', 3000, () => {
              this.adminProfileService.readAlert(this.i).subscribe();
              }); // Prikaz alert-a 10 sekundi
            //this.markAlertAsSeen(this.i); // Obeleži kao pročitano
  
            return of(alert).pipe(delay(3000)); // Sačekaj 10 sekundi pre nego što nastavi sa sledećim alert-om
          })
        ))
      )
      .subscribe();
  }

}
