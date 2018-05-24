import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Challenge} from '../../model/Challenge';
import {ChallengeService} from '../../service/challenge.service';
import {Account} from '../../model/Account';
import {AccountService} from '../../service/account.service';
import {ZipCollectorHelper} from '../../helper/zip-collector.helper';
import {Team} from '../../model/Team';
import * as $ from 'jquery';
import 'bootstrap';
import {runInThisContext} from 'vm';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.css']
})
export class ChallengeDetailsComponent implements OnInit {

  // @Input() public time: string;
  @Input()
  idChallenge: number;

  @ViewChild('teamName') private _teamName: ElementRef;
  @ViewChild('createTeamButton') private _createTeamButton: ElementRef;
  @ViewChild('modifyTeamButton') private _modifyTeamButton: ElementRef;
  @ViewChild('createTeamModal') private _createTeamModal: ElementRef;
  @ViewChild('datalistMembers') private _datalistMembers: ElementRef;
  @ViewChild('organizersTableBody') private _organizersTableBody: ElementRef;

  public team: Team;
  public challenge: Challenge;
  private _mediaXml: XMLDocument;
  private _isModalShowed: boolean;
  private accounts: Account[];
  private readyToDelete: boolean;
  private now: Date;

  private clickedTR: Element;

  public constructor(private _challengeService: ChallengeService, private _accountService: AccountService) {
    this._isModalShowed = false;
    this.readyToDelete = false;
    this.now = new Date();
  }

  public ngOnInit(): void {
    // this.time = 'actual';
    this.clickedTR = null;
    if (this.idChallenge === 0) {
      this._challengeService.getActualChallenge().then(challenge => {
        this.challenge = challenge;
        const parser: DOMParser = new DOMParser();
        this._mediaXml = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
      });
    } else {
      this._challengeService.getChallengeById(this.idChallenge).then(challenge => {
        this.challenge = challenge;
        const parser: DOMParser = new DOMParser();
        this._mediaXml = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
      });
    }
  }

  public hideTrash(event: any): void {
    if (this.clickedTR !== null && $(event.target).parents('.card').length === 0) {
      $(this.clickedTR.firstChild.firstChild).children().eq(1).css('display', 'none');
      this.clickedTR = null;
    }
  }
  public showTrash(event: any): void {
    if ((event.target.tagName === 'I' && event.target.parentElement.parentElement.parentElement.parentElement === this.clickedTR) ||
      (event.target.id === 'profileDarkener' && event.target.parentElement.parentElement.parentElement === this.clickedTR)) {
      this.clickedTR.remove();
      this.clickedTR = null;
    } else if (this.clickedTR !== null) {
      $(this.clickedTR.firstChild.firstChild).children().eq(1).css('display', 'none');
      this.clickedTR = null;
    } else if (event.target.tagName === 'IMG') {
      this.clickedTR = event.target.parentElement.parentElement.parentElement;
      $(this.clickedTR.firstChild.firstChild).children().eq(1).css('display', 'inline-block');
    } else {
      this.clickedTR = event.target.parentElement;
      $(this.clickedTR.firstChild.firstChild).children().eq(1).css('display', 'inline-block');
    }
  }

  public showCreateTeamModal(): void {
    $(this._createTeamModal.nativeElement).modal('show');
    this._isModalShowed = true;
    if (isNullOrUndefined(this.team) && this._teamName.nativeElement.value === '') {
      $(this._createTeamButton.nativeElement).attr('disabled', 'true');
    } else if (!isNullOrUndefined(this.team) && this._teamName.nativeElement.value === '') {
      $(this._modifyTeamButton.nativeElement).attr('disabled', 'true');
    }
  }

  checkTeamName(): void {
    if (this._teamName.nativeElement.value === '') {
      if (isNullOrUndefined(this.team)) {
        $(this._createTeamButton.nativeElement).attr('disabled', 'true');
      } else {
        $(this._modifyTeamButton.nativeElement).attr('disabled', 'true');
      }
      $(this._teamName.nativeElement).removeClass('is-valid');
      $(this._teamName.nativeElement).addClass('is-invalid');
    } else {
      if (isNullOrUndefined(this.team)) {
        $(this._createTeamButton.nativeElement).removeAttr('disabled');
      } else {
        $(this._modifyTeamButton.nativeElement).removeAttr('disabled');
      }
      $(this._teamName.nativeElement).removeClass('is-invalid');
      $(this._teamName.nativeElement).addClass('is-valid');
    }
  }

  public createTeam(): void {
    console.log('Team created!');
  }

  public modifyTeam(): void {
    console.log('Team modified!');
  }

  public deleteTeam(): void {
    console.log('Team deleted!');
  }

  public addPotentialMembers(): void {
    this._accountService.getAllChallengers().then(accounts => {
      this.accounts = accounts;
      let options = '';
      for (let i = 0; i < accounts.length; i++) {
        options += '<option value="' + accounts[i].pseudo + '" />';
      }
      document.getElementById('members').innerHTML = options;
    });
  }

  public addMember(): void {
    for (let i = 0; i < this.accounts.length; i++) {
      const pseudo: string = (document.getElementById('addMember') as HTMLInputElement).value;
      if (this.accounts[i].pseudo === pseudo) {
        let organizers = '<tr>';
        organizers += '<td style="vertical-align: middle;"><div style="position: relative; width: fit-content; height: fit-content"><img style="max-height: 50px; max-width: 50px" src="' + this.accounts[i].image + '"/>';
        organizers += '<div class="table" id="profileDarkener" style="display: none; text-align: center; background-color: black; opacity: 0.5; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%"><i style="vertical-align: middle; color: red" class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div></div></td>';
        organizers += '<td style="vertical-align: middle;">' + this.accounts[i].firstname + '</td>';
        organizers += '<td style="vertical-align: middle;">' + this.accounts[i].lastname + '</td>';
        organizers += '<td style="vertical-align: middle;">' + this.accounts[i].pseudo + '</td>';
        organizers += '</tr>';
        document.getElementById('organizersTableBody').innerHTML += organizers;
        break;
      }
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
