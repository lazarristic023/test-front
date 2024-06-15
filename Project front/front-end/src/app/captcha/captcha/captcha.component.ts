import { AfterViewInit, Component, NgZone, OnInit, Renderer2 } from '@angular/core';
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
  siteKey: string = "6LdhrvkpAAAAAJu40yxWqiGisoHSwbH_i4DVnL9R";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {
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
    this.ngZone.runOutsideAngular(() => {
      grecaptcha.enterprise.ready(() => {
        this.ngZone.run(() => {
          grecaptcha.enterprise.render('recaptcha-container', {
            'sitekey': this.siteKey,
            'size': 'normal',
            'theme': 'light',
            'callback': (response: string) => {
              this.ngZone.run(() => {
                this.onCaptchaSuccess(response);
              });
            }
          });
        });
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
      // Handle submit event
    }
  }
}
