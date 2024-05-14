import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { AllRequestsComponent } from './requests/all-requests/all-requests.component';
import { EmailComponent } from './email/email/email.component';
import { AuthGuard } from './infrastructure/authentication/AuthGuard';




const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'requests', component: AllRequestsComponent , canActivate: [AuthGuard]},
  { path: 'email', component: EmailComponent , canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
