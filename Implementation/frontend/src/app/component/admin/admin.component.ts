import { Component, OnInit } from '@angular/core';
import {Account} from '../../model/Account';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public pendingOrganizer:Account[];

  constructor(private _accountService: AccountService) { }

  ngOnInit() {
    this._accountService.getOrganizerPending().then(pendingOrganizer => this.pendingOrganizer = pendingOrganizer);

  }



  public acceptAccountPending(accountToAccept: Account): void {

   }

   public rejectAccountPending(accountToReject: Account): void {
     this._accountService.deleteOrganizerPending(accountToReject);

    }

}
