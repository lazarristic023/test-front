import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { Commercial } from 'src/app/model/commercial.model';
import { CommercialRequest } from 'src/app/model/commercial-request.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {

  employeeForm!: FormGroup;
  employee!: Employee ;
  commercials:Commercial[]=[]
  commercialsRequests:CommercialRequest[]=[]
  newCommercial:Commercial= new Commercial();

  constructor(private fb: FormBuilder,private employeeService:EmployeeService,private authService:AuthService,private router:Router) {
    this.getEmployee();
    this.getCommercials()
    this.getCommercialsRequests()
  }

  populateForm(){
    this.employeeForm = this.fb.group({
      id: [this.employee.id],
      email: [this.employee.email],
      password: [this.employee.password],
      role: [this.employee.role],
      emailChecked: [this.employee.emailChecked]
    });
  }

  getEmployee(){
    const id = this.authService.getUserId();
  
    this.employeeService.getEmployee(id).subscribe({
        next:(res)=>{
          console.log(res)
          this.employee=res
          this.populateForm();
        },
        error:(err)=> {
          console.log(err)
        },
    })
  }

  updateEmployee(){
 

    const passwordControl = this.employeeForm.get('password');
    if (passwordControl) {
      this.employee.password = passwordControl.value;
    }

    this.employeeService.updateEmployee(this.employee).subscribe({
      next:(res)=>{

        this.employee=res;
        console.log('Apdejtovanii')
        this.router.navigate(['login']);

      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  getCommercials(){
    const id = this.authService.getUserId();
    this.employeeService.getCommercials(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.commercials=res
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getCommercialsRequests(){
    const id = this.authService.getUserId();
    this.employeeService.getCommercialsRequests().subscribe({
      next:(res)=>{
        console.log(res)
        this.commercialsRequests=res
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  accept(comReq:CommercialRequest){
    this.newCommercial.clientId=comReq.clientId
    this.newCommercial.description=comReq.description;
    this.newCommercial.endDate=comReq.endDate
    this.newCommercial.startDate=comReq.startDate
    console.log('NOVA REKLAMA',this.newCommercial)

    this.employeeService.createCommercial(this.newCommercial).subscribe({
      next:(res)=>{
        this.getCommercials()
        this.updateCommercialRequest(comReq)
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  updateCommercialRequest(comReq:CommercialRequest){

    comReq.accepted=true
    this.employeeService.updateCommercialRequest(comReq).subscribe({
      next:(res)=>{
        this.getCommercialsRequests
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

}
