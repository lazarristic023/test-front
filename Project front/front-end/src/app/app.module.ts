import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './layout/login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './infrastructure/interceptor/TokenInterceptor';
import { DateAdapter } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './layout/home/home.component';
import { ClientRegisterFormComponent } from './client-register/client-register-form/client-register-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ClientRegisterFormComponent

    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
