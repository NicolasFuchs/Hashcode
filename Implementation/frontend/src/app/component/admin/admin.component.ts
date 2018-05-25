import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Account} from '../../model/Account';
import {Role} from '../../model/Role';
import {AccountService} from '../../service/account.service';
import {AuthenticationService} from '../../service/authentication.service';
//import { Router } from '@angular/router';
import * as $ from 'jquery';
import {Roles} from '../../constant/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})





export class AdminComponent implements OnInit {
    [x: string]: any;


  @ViewChild('errorModal') private _errorModal: ElementRef;

  public pendingOrganizer:Account[];
  public debug:string;
  public msgModal:string;
  private _isModalShowed: boolean;
  public account: Account;


  constructor(
    private _authenticationService: AuthenticationService,
    private _accountService: AccountService,
    private router: Router
    ) {
      this._isModalShowed = false;
      this.msgModal = "[Pas de message]";
}

  ngOnInit() {


      this.account = this._authenticationService.actual;
      this._authenticationService.account.subscribe(account => {
          this.account = account;
          console.log("kaffakà");
          if(this.account.role.name != Roles.ADMIN.name ){
            this.router.navigate(['/home'])
          }
      });

    //  if(!this.account) this.router.navigate(['/home'])

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

    public showErrorModal(): void {
      $(this._errorModal.nativeElement).modal('show');
        this._isModalShowed = true;
    }

    public closeErrorModal(): void {
      $(this._errorModal.nativeElement).modal('show');
        this._isModalShowed = true;
    }



  public acceptAccountPending(index: number): void {
    this._accountService.updateOrganizerPending(this.pendingOrganizer[index])
    .then(() => this.pendingOrganizer.splice(index, 1))
    .catch((error: any) =>  this.exceptionDetect(error.error.errorCode));
    this.msgModal = "[Pas de message]";
   }

   public rejectAccountPending(index: number): void {
      this._accountService.deleteOrganizerPending(this.pendingOrganizer[index])
        .then(() => this.pendingOrganizer.splice(index, 1))
        .catch((error: any) =>  this.exceptionDetect(error.error.errorCode));
        this.msgModal = "[Pas de message]";
  }

  private handleofError(error: any): void {
    this.typeEr = <any>error.error.errorCode;

  }

  private exceptionDetect(codeError:string): void {
    console.log("Type : "+codeError);
    if(!codeError) return;
    if(codeError == "C-01"){
        this.msgModal = "La demande de l'utilisateur à déjà été refusé par un autre administrateur, votre requête a donc déjà été effectué, veuillez recharger la page";
    }else if(codeError == "C-02"){
      this.msgModal = "La demande de l'utilisateur à été accepté par un autre administrateur, votre refus ne sera donc pas validé, veuillez recharger la page";
    }else if(codeError == "C-03"){
        this.msgModal = "La demande de l'utilisateur à déjà été refusé par un autre administrateur, votre validation ne sera donc pas effectué, veuillez recharger la page";
    }else if(codeError == "C-04"){
      this.msgModal = "La demande de l'utilisateur à déjà été accepté par un autre administrateur, votre requête a donc déjà été effectué, veuillez recharger la page";
    }
    this.msgModal = codeError + " : "+this.msgModal;
    this.showErrorModal();
  }

}
