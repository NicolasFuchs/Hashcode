import {Component, OnInit, Input} from '@angular/core';
import {Challenge} from '../../model/Challenge';
import {ChallengeService} from '../../service/challenge.service';


@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.css']
})
export class ChallengesListComponent implements OnInit {

  public challenges:Challenge[];
  public challengeClicked:boolean;
  public challengeIdClicked:number;

  @Input()
  time: string;

  constructor(private _challengeService: ChallengeService) {
  }

  ngOnInit() : void {
    if(this.time=="past") this._challengeService.getPastChallenges().then(challenges => this.challenges = challenges);
    else if (this.time=="futur") this._challengeService.getFutureChallenges().then(challenges => this.challenges = challenges);
    this.challengeClicked = false;
    this.challengeIdClicked = 0;
  }

  private showInfoChallenge (challengeId: number):void{
    this.challengeIdClicked = challengeId;
    this.challengeClicked = true;
  }

  



}
