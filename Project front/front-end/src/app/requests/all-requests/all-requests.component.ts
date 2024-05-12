import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { MatDialog } from '@angular/material/dialog';
import { RejectDialogComponent } from 'src/app/dialog/reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.css']
})
export class AllRequestsComponent {

  message: String=""
  requests:Request[]=[]
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

  accept(request:Request){
    this.requestService.acceptRequest(request).subscribe({
      next:(res)=>{
         this.getAllRequests();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  reject(request:Request){

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
