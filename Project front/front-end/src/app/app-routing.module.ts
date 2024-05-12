import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ClientRegisterFormComponent } from './client-register/client-register-form/client-register-form.component';



const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'client-register', component: ClientRegisterFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
