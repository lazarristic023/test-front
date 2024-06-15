import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
declare var grecaptcha: any;

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit,AfterViewInit {
  aFormGroup!: FormGroup;
  secretKey:string="6LeUcfcpAAAAAK6rHf98i4MX_KP93IzGg0ufdNBN"
  siteKey:string="6LeUcfcpAAAAAEIKKquyucK8yDAX2VTZLMMd0Lu2"
  constructor(private formBuilder: FormBuilder,private router:Router,private renderer: Renderer2) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    grecaptcha.enterprise.ready(() => {
      grecaptcha.enterprise.render('recaptcha-container', {
        'sitekey': this.siteKey,
        'size': 'normal', 
        'theme': 'light', 
        'callback': (response: string) => {
          this.onCaptchaSuccess(response);
        }
      });
    });
  }
  onCaptchaSuccess(response: string) {
    if (response) {
      this.aFormGroup.controls['recaptcha'].setValue(response);
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    if (this.aFormGroup.valid) {
      // Rukovanje submit događajem
    }
  }
}
