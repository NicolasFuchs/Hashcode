import { Component, OnInit } from '@angular/core';
import {Account} from '../../model/Account';
import {Role} from '../../model/Role';
import {AccountService} from '../../service/account.service';
import {AuthenticationService} from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public pendingOrganizer:Account[];
  public accountLogged:Account;
  public debug:string;

  constructor(private _authenticationService: AuthenticationService,
    private _accountService: AccountService,
private router: Router) { }

  ngOnInit() {
      this.debug = "default";
      this.accountLogged = this._authenticationService.actual;
      this._authenticationService.account.subscribe(accountLogged => this.accountLogged = accountLogged);

      /*if(this.accountLogged){
          this.debug = "existe";
      }else{
        this.debug = "existe pas";
      }*/
      this._accountService.getOrganizerPending().then(pendingOrganizer => this.pendingOrganizer = pendingOrganizer);
    }




  public acceptAccountPending(accountToAccept: Account): void {

   }

   public rejectAccountPending(accountToReject: Account): void {
     this._accountService.deleteOrganizerPending(accountToReject);

    }

}
