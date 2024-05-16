import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ClientRegisterFormComponent } from './client-register/client-register-form/client-register-form.component';
import { HomeComponent } from './layout/home/home.component';
import { AllRequestsComponent } from './requests/all-requests/all-requests.component';
import { EmailComponent } from './email/email/email.component';
import { AuthGuard } from './infrastructure/authentication/AuthGuard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { EditAdminProfileComponent } from './edit-admin-profile/edit-admin-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile/client-profile.component';
import { LinkInvalidComponent } from './email/link-invalid/link-invalid.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';

import { RegisterAdminsComponent } from './register-admins/register-admins.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'client-register', component: ClientRegisterFormComponent, canActivate: [AuthGuard ]},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'requests', component: AllRequestsComponent , canActivate: [AuthGuard]},
  { path: 'email', component: EmailComponent , canActivate: [AuthGuard] },
  { path: 'adminProfile', component: AdminProfileComponent , canActivate: [AuthGuard] },
  { path: 'editAdminProfile', component: EditAdminProfileComponent , canActivate: [AuthGuard] },
  //{ path: 'client-register', component: ClientRegisterFormComponent },
  //{ path: 'home', component: HomeComponent },
  //{ path: 'requests', component: AllRequestsComponent },
  { path: 'client-profile', component: ClientProfileComponent },
  { path: 'successfully/:email/:id/:expiry/:token', component: EmailComponent },
  {path: 'email-link-invalid', component:LinkInvalidComponent},
  {path:'employeeProfile',component:EmployeeProfileComponent},
  { path: 'createAdmin', component: RegisterAdminsComponent , canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent , canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
