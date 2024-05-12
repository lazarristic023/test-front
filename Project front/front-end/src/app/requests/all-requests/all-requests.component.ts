import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { MatDialog } from '@angular/material/dialog';
import { RejectDialogComponent } from 'src/app/dialog/reject-dialog/reject-dialog.component';
import { Requestt } from 'src/app/model/requestt.model';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.css']
})
export class AllRequestsComponent {

  message: String=""
  requests:Requestt[]=[]
  constructor(private requestService:RequestService,private dialog:MatDialog ){
    this.getAllRequests()
  }

  getAllRequests(){
    this.requestService.getRequests().subscribe({
      next:(res)=>{
          this.requests=res
          console.log('Requests', this.requests)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  accept(request:Requestt){
    this.requestService.acceptRequest(request).subscribe({
      next:(res)=>{
         this.getAllRequests();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  reject(request:Requestt){

    const dialogRef = this.dialog.open(RejectDialogComponent);

    dialogRef.afterClosed().subscribe(reason => {
      if (reason) {
        this.requestService.rejectRequest(request, reason).subscribe({
          next: (res) => {
            this.getAllRequests();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
    
  }
}
