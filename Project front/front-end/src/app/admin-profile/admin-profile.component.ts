import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AdminProfileService } from '../service/admin-profile.service';
import { Company } from '../model/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{

  employees:User[]=[]
  clients:User[]=[]
  companies:Company[]=[]


  constructor(private service:AdminProfileService,private router:Router){}
  ngOnInit(): void {
   //this.getAllClients();
  // this.getAllEmployees();
   this.getAllCompanies();
  }

  getAllEmployees(){
    this.service.getAllEmployees().subscribe({
      next: (res)=>{
        this.employees = res;
        console.log("Zaposleni: ",res);
      },
      error:(err)=>{
        console.log('greska',err)
      }
    })
  }

  getAllClients(){
    this.service.getAllClients().subscribe({
      next: (res)=>{
        this.clients = res;
        console.log("Clients: ",res);
      },

    })
  }

  getAllCompanies(){
    this.service.getAllCompanies().subscribe({
      next: (res)=>{
        this.companies = res;
        console.log("Companies: ",res);
      },

    })
  }

  editAdmin() {
    this.router.navigate(['/editAdminProfile']);
  }
}
