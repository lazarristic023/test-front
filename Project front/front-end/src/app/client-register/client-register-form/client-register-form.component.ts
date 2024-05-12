import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-client-register-form',
  templateUrl: './client-register-form.component.html',
  styleUrls: ['./client-register-form.component.css']
})
export class ClientRegisterFormComponent {
  isLegalEntity: boolean = false;
  userForm: FormGroup;
  packageType: string | undefined;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      userType: [false, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      packageType: ['BASIC', Validators.required],
    }, {
      validator: [ this.passwordMatchValidator, this.passwordStrengthValidator]
    });

    // Pretplata na promene u formi
    this.userForm.get('packageType')?.valueChanges.subscribe((value) => {
      console.log('Izabran paket:', value);
      // Ovde možete dodati dodatne radnje koje treba da se izvrše kada se izabere paket
      this.packageType = value;
    });

  }

  passwordMatchValidator(formGroup: FormGroup) {
    var a = formGroup.get('password');
    var b = formGroup.get('confirmPassword');
    const password = a;
    const confirmPassword = b;
  
    if (password && confirmPassword) {
      const match = password.value === confirmPassword.value;
      if (!match) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  
    return null;
  }

  // Validator za proveru jačine lozinke
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)) {
        return { 'passwordStrength': true };
      }
      return null;
    };
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
      type: this.userForm.get('userType')?.value ? 'LEGALLY' : 'PHYSICALLY',
      packageType: this.packageType
    };

    console.log(client.package)

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
