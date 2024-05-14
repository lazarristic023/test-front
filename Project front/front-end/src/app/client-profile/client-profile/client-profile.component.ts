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
  inputUsername: boolean = false;
  usernameValue: string = '';
  inputEmail: boolean = false;
  emailValue: string = '';
  inputFirstName: boolean = false;
  firstNameValue: string = '';
  inputLastName: boolean = false;
  lastNameValue: string = '';
  inputAddress: boolean = false;
  addressValue: string = '';
  inputCity: boolean = false;
  cityValue: string = '';
  inputCountry: boolean = false;
  countryValue: string = '';
  inputPhone: boolean = false;
  phoneValue: string = '';
  userId: number | undefined;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.initForm();
    this.getCommercials();
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
          this.getClient();
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
            this.commercialRequestForm.reset();
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

  editUsername(): void {
    //this.clientService.updateEmail(this.authService.getUserId(), this.emailValue);
  }

  editEmail(): void {
    this.clientService.updateEmail(this.authService.getUserId(), this.emailValue);
    location.reload()
  }

  editFirstName(): void {
    //console.log(this.firstNameValue);
    this.clientService.updateName(this.authService.getUserId(), this.firstNameValue);
    location.reload()
  }

  editLastName(): void {
    this.clientService.updateSurname(this.authService.getUserId(), this.lastNameValue);
    location.reload()
  }

  editAddress(): void {
    console.log(this.addressValue);
    this.clientService.updateAddress(this.authService.getUserId(), this.addressValue);
    //location.reload()
  }

  editCity(): void {
    this.clientService.updateCity(this.authService.getUserId(), this.cityValue);
    location.reload()
  }

  editCountry(): void {
    this.clientService.updateCountry(this.authService.getUserId(), this.countryValue);
    location.reload()
  }

  editPhone(): void {
    this.clientService.updatePhone(this.authService.getUserId(), this.phoneValue);
    location.reload()
  }

  onUsernameInput(event: any): void {
    this.usernameValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputUsername = true; // Postavljanje na true kada korisnik počne kucati
  }

  onEmailInput(event: any): void {
    this.emailValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputEmail = true; // Postavljanje na true kada korisnik počne kucati
  }

  onFirstNameInput(event: any): void {
    this.firstNameValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputFirstName = true; // Postavljanje na true kada korisnik počne kucati
  }

  onLastNameInput(event: any): void {
    this.lastNameValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputLastName = true; // Postavljanje na true kada korisnik počne kucati
  }

  onAddressInput(event: any): void {
    this.addressValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputAddress = true; // Postavljanje na true kada korisnik počne kucati
  }

  onCityInput(event: any): void {
    this.cityValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputCity = true; // Postavljanje na true kada korisnik počne kucati
  }

  onCountryInput(event: any): void {
    this.countryValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputCountry = true; // Postavljanje na true kada korisnik počne kucati
  }

  onPhoneInput(event: any): void {
    this.phoneValue = event.target.value; // Čuvanje vrednosti input polja
    this.inputPhone = true; // Postavljanje na true kada korisnik počne kucati
  }
}
