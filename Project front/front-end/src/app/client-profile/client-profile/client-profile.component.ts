import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { Client } from 'src/app/model/client.model';
import { CommercialRequest } from 'src/app/model/commercial-request.model';
import { Commercial } from 'src/app/model/commercial.model';
import { ClientService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  commercialRequestForm!: FormGroup;
  commercials: Commercial[] = [];
  client: Client = new Client();
  editMode: any = {};


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getCommercials()
    this.getClient();
    this.initForm();
  }

  private getClient(): void {
    this.clientService.getClientData(this.authService.getUserId()).subscribe( {
      next:(res)=>{
          this.client = res;
      },
      error:(err)=>{
        console.log('nije ucitao podatke o klijentu',err)
      }
    });
  }

  private getCommercials() : void {
    this.clientService.getClientCommercials(this.authService.getUserId()).subscribe( {
      next:(res)=>{
          this.commercials = res;
      },
      error:(err)=>{
        console.log('nije ucitao reklame',err)
      }
    });
  }

  private initForm(): void {
    this.commercialRequestForm = this.formBuilder.group({
      description: ['', Validators.required],
      createDeadline: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    }, { 
      validator: this.dateValidator 
    });
  }

  private dateValidator(formGroup: FormGroup) {
    const createDeadline = formGroup.get('createDeadline');
    const start = formGroup.get('start');
    const end = formGroup.get('end');
  
    if (createDeadline && start && end) {
      const createDeadlineDate = new Date(createDeadline.value);
      const startDate = new Date(start.value);
      const endDate = new Date(end.value);
  
      if (createDeadlineDate >= startDate) {
        createDeadline.setErrors({ 'invalidDate': true });
      }
  
      if (startDate >= endDate) {
        start.setErrors({ 'invalidDate': true });
      }
    }
  }

  submitRequest(): void {
    if (this.commercialRequestForm.valid) {
      const commercialRequest: any = {
        description: this.commercialRequestForm.value.description || '',
        createDeadlineDate: this.commercialRequestForm.value.createDeadline || '',
        startDate: this.commercialRequestForm.value.start || '',
        endDate: this.commercialRequestForm.value.end || '',
        clientId: this.authService.getUserId(),
        isAccepted: false
      };

      // Ovde šaljete 'commercialRequest' objekat na backend
      console.log('Submit request:', commercialRequest);
      this.clientService.sendCommercialRequest(commercialRequest).subscribe( {
        next:(res)=>{
            console.log('successfull',res)
            this.commercialRequestForm.reset;
        },
        error:(err)=>{
          console.log('nije poslao zahtjev za reklamu',err)
        }
      });

    } else {
      console.log('Form is invalid');
      // Možete dodati logiku za prikazivanje poruke o grešci ili dodatne akcije ako forma nije validna
    }
  }

  enableEditMode(field: string): void {
    this.editMode[field] = true; // Kada se pozove funkcija enableEditMode, postavićemo odgovarajući ključ u editMode objektu na true
  }

  toggleEditMode(field: string): void {
    this.editMode[field] = !this.editMode[field]; // Kada se pozove funkcija toggleEditMode, promenićemo vrednost ključa u editMode objektu
  }
}
