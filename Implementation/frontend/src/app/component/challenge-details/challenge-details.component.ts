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

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.css']
})
export class ChallengeDetailsComponent implements OnInit {

  // @Input() public time: string;
  @Input()
  idChallenge: number;

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

  public constructor(private _challengeService: ChallengeService, private _accountService: AccountService) {
    this._isModalShowed = false;
    this.readyToDelete = false;
    this.now = new Date();
  }

  public ngOnInit(): void {
    // this.time = 'actual';
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
    const newThis = this;
    $(':not(#profileDarkener)').on('click', function (e) {
      if (newThis.readyToDelete) {
        console.log('9');
        document.getElementById('profileDarkener').style.display = 'none';
        console.log('10');
        newThis.readyToDelete = false;
        console.log('11');
      }
    });
    $('#organizersTableBody').on('click', 'tr', function(e) {
      console.log('0');
      e.stopPropagation();
      debugger;
      if (!newThis.readyToDelete) {
        // console.log($(this).closest('tr').find('td:last-child').text());
        console.log('1');
        $(this).closest('tr').find('td:first-child #profileDarkener').css('display', 'inline-block');
        console.log('2');
        newThis.readyToDelete = true;
        console.log('3');
        $(this).closest('tr').find('td:first-child #profileDarkener').one('click', function() {
          console.log('4');
          $(this).closest('tr').remove();
          console.log('5');
          newThis.readyToDelete = false;
          console.log('6');
        });
      }
      /*$(this).closest('tr').find('td:first-child #profileDarkener').on('click', function() {
        $(this).closest('tr').remove();
        newThis.readyToDelete = true;
      });*/
      /*$('tr:not(td:first-child #profileDarkener)').on('click', function() {
        if (newThis.readyToDelete) {
          console.log('display = none');
          document.getElementById('profileDarkener').style.display = 'none';
          newThis.readyToDelete = false;
        }
      });*/
    });
    /*$('body').on('click', 'tr:not(td:first-child #profileDarkener)',  function() {
      if (newThis.readyToDelete) {
        console.log('display = none');
        document.getElementById('profileDarkener').style.display = 'none';
        newThis.readyToDelete = false;
      }
    });*/
  }
}

  public showCreateTeamModal(): void {
    $(this._createTeamModal.nativeElement).modal('show');
    this._isModalShowed = true;
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

  public displayPotentialMembers(): void {
    this._accountService.getAllChallengers().then(accounts => {
      this.accounts = accounts;
      let options = '';
      for (let i = 0; i  < accounts.length; i++) {
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
        /*$('#organizersTableBody').on('click', 'tr', function() {
          console.log(this);
          console.log($(this).closest('tr').find('td:last-child').text());
          $(this).closest('tr').find('td:first-child IMG').on('click', function() {
            $(this).closest('tr').remove();
          });
        });*/
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
