import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Account} from '../../model/Account';
import {Role} from '../../model/Role';
import {AccountService} from '../../service/account.service';
import {AuthenticationService} from '../../service/authentication.service';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
    [x: string]: any;

  public pendingOrganizer:Account[];
  public debug:string;



  constructor(/*private _authenticationService: AuthenticationService,*/
    private _accountService: AccountService,
    ) {
}

  ngOnInit() {
      this.debug = "default";
      //this.accountLogged = this._authenticationService.actual;
      //this._authenticationService.account.subscribe(accountLogged => this.accountLogged = accountLogged);

      /*if(this.accountLogged){
          this.debug = "existe";
      }else{
        this.debug = "existe pas";
      }*/
      this._accountService.getOrganizerPending().then(pendingOrganizer => this.pendingOrganizer = pendingOrganizer);
    //  this.popToast();
  
    }




  public acceptAccountPending(index: number): void {
    if(this._accountService.updateOrganizerPending(this.pendingOrganizer[index]).then(() => this.pendingOrganizer.splice(index, 1))){

    }else{

    }
   }

   public rejectAccountPending(index: number): void {
     this._accountService.deleteOrganizerPending(this.pendingOrganizer[index]).then(() => this.pendingOrganizer.splice(index, 1));
    }


}
