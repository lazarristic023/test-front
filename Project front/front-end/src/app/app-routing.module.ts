import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { AllRequestsComponent } from './requests/all-requests/all-requests.component';
import { EmailComponent } from './email/email/email.component';
import { LinkInvalidComponent } from './email/link-invalid/link-invalid.component';




const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'requests', component: AllRequestsComponent },
  { path: 'successfully/:email/:id/:expiry/:token', component: EmailComponent },
  {path: 'email-link-invalid', component:LinkInvalidComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
