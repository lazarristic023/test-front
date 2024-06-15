import { Component } from '@angular/core';
import { VPNService } from '../vpn.service';

@Component({
  selector: 'app-vpn',
  templateUrl: './vpn.component.html',
  styleUrls: ['./vpn.component.css']
})
export class VPNComponent {

  decodedMessage: string = '';
  json:string ='';
  constructor(private service:VPNService){

    this.fetchMessage();


  }

  fetchMessage(){
    this.service.fetchVPNMessage().subscribe({
      next:(response)=>{
        console.log("Odgovoor",response)
          // Assuming the response is a base64 encoded string
      try {
        this.json=response
        const decodedResponse = atob(response);
        this.decodedMessage=decodedResponse;
        console.log(decodedResponse);
      } catch (e) {
        console.error('Error decoding base64 response:', e);
      }
      },
      error:(err) =>{
        console.log(err)
      },
    })
  }
}
