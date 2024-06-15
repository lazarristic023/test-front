import { Component } from '@angular/core';
import { VPNService } from '../vpn.service';

@Component({
  selector: 'app-vpn',
  templateUrl: './vpn.component.html',
  styleUrls: ['./vpn.component.css']
})
export class VPNComponent {

  constructor(private service:VPNService){

    this.fetchMessage();


  }

  fetchMessage(){
    this.service.fetchVPNMessage().subscribe({
      next:(response)=>{
          console.log(response)
      },
      error:(err) =>{
        console.log(err)
      },
    })
  }
}
