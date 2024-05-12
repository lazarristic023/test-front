import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-client-register-form',
  templateUrl: './client-register-form.component.html',
  styleUrls: ['./client-register-form.component.css']
})
export class ClientRegisterFormComponent {
  isLegalEntity: boolean = false;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.userForm = this.formBuilder.group({
      userType: [false, Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  register(): void {
    const client: any = {
      username: this.userForm.value.username || '',
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
      role: 'CLIENT', // Dodajemo podrazumevanu vrednost za 'role'
      clientFirmName: this.userForm.value.name || '',
      clientSurnameFirmPIB: this.userForm.value.surname || '',
      clientFirmResidentialAddress: this.userForm.value.address || '',
      city: this.userForm.value.city || '',
      country: this.userForm.value.country || '',
      phone: this.userForm.value.phone || '',
      type: this.isLegalEntity ? 'LEGALLY' : 'PHYSICALLY'
    };

    this.clientService.registerClient(client).subscribe( {
      next:(res)=>{
          console.log('successfull',res)
          //this.router.navigate(['home'])
      },
      error:(err)=>{
        console.log('greska',err)
      }
    });
  }
}
