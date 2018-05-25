import {Component, OnInit, Input} from '@angular/core';
import {Challenge} from '../../model/Challenge';
import {ChallengeService} from '../../service/challenge.service';
import { AccountService } from '../../service/account.service';
import { AuthenticationService } from '../../service/authentication.service';
import { Role } from '../../model/Role';
import { Roles } from '../../constant/roles';
import {Account} from '../../model/Account';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.css']
})
export class ChallengesListComponent implements OnInit {
    account: Account;


  public challenges:Challenge[];
  public challengeClicked:boolean;
  public challengeIdClicked:number;
  public roleValidatedUser:Role;
  public roleValidatedOrganizer:Role;

  @Input()
  time: string;

  constructor(
    private _accountService: AccountService,
    private _authenticationService: AuthenticationService,
    private _challengeService: ChallengeService) {

  }

  ngOnInit() : void {
    if(this.time=="past") this._challengeService.getPastChallenges().then(challenges => this.challenges = challenges);
    else if (this.time=="futur") this._challengeService.getFutureChallenges().then(challenges => this.challenges = challenges);
    this.challengeClicked = false;
    this.challengeIdClicked = 0;

    this.account = this._authenticationService.actual;
    this._authenticationService.account.subscribe(account => {
      this.account = account;
    });
    this.roleValidatedUser = Roles.VALIDATED_USER;
    this.roleValidatedOrganizer = Roles.VALIDATED_ORGANIZER;
  }

  private showInfoChallenge (challengeId: number):void{
    this.challengeIdClicked = challengeId;
    this.challengeClicked = true;
  }





}
