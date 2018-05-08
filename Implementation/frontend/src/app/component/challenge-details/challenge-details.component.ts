import {Component, OnInit} from '@angular/core';
import {Challenge} from '../../model/Challenge';
import {ChallengeService} from '../../service/challenge.service';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.css']
})
export class ChallengeDetailsComponent implements OnInit {

  // @Input() public time: string;

  public challenge: Challenge;

  public constructor(private _challengeService: ChallengeService) {
  }

  public ngOnInit(): void {
    // this.time = 'actual';
    this._challengeService.getActualChallenge().then(challenge => this.challenge = challenge);
  }

  public getDescription(): string {
    if (typeof this.challenge !== 'undefined') {
      const parser: DOMParser = new DOMParser();
      const xml: XMLDocument = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
      return xml.getElementsByTagName('description')[0].textContent;
    }
    return '';
  }
}
