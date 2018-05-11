import {Component, OnInit, Input} from '@angular/core';
import {Challenge} from '../../model/Challenge';
import {ChallengeService} from '../../service/challenge.service';
import {Account} from '../../model/Account';
import {ZipCollectorHelper} from '../../helper/zip-collector.helper';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.css']
})
export class ChallengeDetailsComponent implements OnInit {

  // @Input() public time: string;
  @Input()
  idChallenge: number;

  public challenge: Challenge;
  private _mediaXml: XMLDocument;

  public constructor(private _challengeService: ChallengeService) {
  }

  public ngOnInit(): void {
    // this.time = 'actual';
    if(this.idChallenge == 0){
    this._challengeService.getActualChallenge().then(challenge => {
      this.challenge = challenge;
      const parser: DOMParser = new DOMParser();
      this._mediaXml = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
    });

  }else{
    this._challengeService.getChallengeById(this.idChallenge).then(challenge => {
      this.challenge = challenge;
      const parser: DOMParser = new DOMParser();
      this._mediaXml = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
  });

  }
}

  public getDescription(): string {
    if (typeof this._mediaXml !== 'undefined') {
      return this._mediaXml.getElementsByTagName('description')[0].textContent;
    }
    return '';
  }

  public getProfilePicture(accountId: number): string {
    const account: Account = this.getAccountFromAccountId(accountId);
    if (account !== null && account.image !== null) {
      return account.image;
    }
    return 'assets/default_profile_picture.png';
  }

  public hasFigures(): boolean {
    if (typeof this._mediaXml !== 'undefined') {
      return this._mediaXml.getElementsByTagName('figure').length > 0;
    }
    return false;
  }

  public hasVideos(): boolean {
    if (typeof this._mediaXml !== 'undefined') {
      return this._mediaXml.getElementsByTagName('video').length > 0;
    }
    return false;
  }

  public downloadFigures(): void {
    const figures: NodeList = this._mediaXml.getElementsByTagName('figure')[0].childNodes;
    const names: string[] = [];
    for (let i = 0; i < figures.length; i++) {
      names.push(figures.item(i).textContent);
    }
    const zip: ZipCollectorHelper = new ZipCollectorHelper();
    zip.collect(this.challenge.name.replace(/ /g, '_') + '_figures.zip', names);
  }

  public downloadVideos(): void {
    const videos: NodeList = this._mediaXml.getElementsByTagName('video')[0].childNodes;
    const names: string[] = [];
    for (let i = 0; i < videos.length; i++) {
      names.push(videos.item(i).textContent);
    }
    const zip: ZipCollectorHelper = new ZipCollectorHelper();
    zip.collect(this.challenge.name.replace(/ /g, '_') + '_videos.zip', names);
  }

  private getAccountFromAccountId(accountId: number): Account {
    const account: Account = this.challenge.organizers.find(accountEl => accountEl.accountId === accountId);
    return typeof account !== 'undefined' ? account : null;
  }
}
