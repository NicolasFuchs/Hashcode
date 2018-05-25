import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Challenge} from '../../model/Challenge';
import {ChallengeService} from '../../service/challenge.service';
import {Account} from '../../model/Account';
import {AccountService} from '../../service/account.service';
import {ZipCollectorHelper} from '../../helper/zip-collector.helper';
import {Team} from '../../model/Team';
import * as $ from 'jquery';
import 'bootstrap';
import {isNullOrUndefined} from 'util';
import {AuthenticationService} from '../../service/authentication.service';
import {Solution} from '../../model/Solution';
import {TeamService} from '../../service/team.service';
import {Roles} from '../../constant/roles';
import { Role } from '../../model/Role';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.css']
})
export class ChallengeDetailsComponent implements OnInit {

  // @Input() public time: string;
  @Input()
  idChallenge: number;

  @ViewChild('solutionsModal') private _solutionsModal: ElementRef;
  @ViewChild('uploadModal') private _uploadModal: ElementRef;
  @ViewChild('teamName') private _teamName: ElementRef;
  @ViewChild('createTeamButton') private _createTeamButton: ElementRef;
  @ViewChild('modifyTeamButton') private _modifyTeamButton: ElementRef;
  @ViewChild('createTeamModal') private _createTeamModal: ElementRef;
  @ViewChild('datalistMembers') private _datalistMembers: ElementRef;
  @ViewChild('membersTableBody') private _membersTableBody: ElementRef;

  public account: Account;
  public currentTeam: Team;
  public isPartOfThisChallenge: boolean;
  public team: Team;
  public challenge: Challenge;
  private _mediaXml: XMLDocument;
  private _isModalShowed: boolean;
  private accounts: Account[];
  private accountsToAdd: Account[];
  private accountsToDel: Account[];
  private accountsInTeam: Account[];
  private readyToDelete: boolean;
  private now: Date;

  public roleValidatedUser:Role;
  public roleValidatedOrganizer:Role;

  public classementProv: Team[];
  public classement;

  private clickedTR: Element;

  public constructor(private _challengeService: ChallengeService,
                     private _accountService: AccountService,
                     private _authenticationService: AuthenticationService,
                     private _teamService: TeamService) {
    this._isModalShowed = false;
    this.readyToDelete = false;
    this.now = new Date();
    this.classement = [];
    this.roleValidatedUser = Roles.VALIDATED_USER;
    this.roleValidatedOrganizer = Roles.VALIDATED_ORGANIZER;
  }

  public ngOnInit(): void {
    // Get account and listen
    this.account = this._authenticationService.actual;
    this._authenticationService.account.subscribe(account => {
      this.account = account;
      this.checkPartOfThisChallenge();
    });
    this.now = new Date();
    // this.time = 'actual';
    this.clickedTR = null;
    this.accountsToAdd = [];
    this.accountsToDel = [];
    this.accountsInTeam = [];
    if (this.idChallenge == 0) {
      this._challengeService.getActualChallenge().then(challenge => {
        this.challenge = challenge;
        const parser: DOMParser = new DOMParser();
        this._mediaXml = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
        this.checkPartOfThisChallenge();
        this.generateClassement();
      });
    } else {
      this._challengeService.getChallengeById(this.idChallenge).then(challenge => {
        this.challenge = challenge;
        const parser: DOMParser = new DOMParser();
        this._mediaXml = parser.parseFromString(this.challenge.mediaXml, 'text/xml');
        this.checkPartOfThisChallenge();
        this.generateClassement();
      });
    }

    this.enableFileEvent();
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
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].pseudo === this.clickedTR.lastChild.nodeValue) {
          if (this.accountsToAdd.includes(this.accounts[i])) {
            this.accountsToAdd.splice(this.accountsToAdd.indexOf(this.accounts[i]), 1);
          } else {
            this.accountsToDel.push();
          }
        }
      }
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
    console.log(this._teamName.nativeElement.value);
    console.log(this.account);
    this._teamService.createTeam(new Team(this._teamName.nativeElement.value,
      this.challenge,
      this.account,
      this.accountsToAdd));
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
      if (this.accounts[i].pseudo === pseudo && !this.accountsInTeam.includes(this.accounts[i])) {
        if (this.accountsToDel.includes(this.accounts[i])) {
          this.accountsToDel.splice(this.accountsToDel.indexOf(this.accounts[i]), 1);
        } else {
          this.accountsToAdd.push(this.accounts[i]);
        }
        this.accountsToAdd.push(this.accounts[i]);
        let members = '<tr>';
        members += '<td style="vertical-align: middle;"><div style="position: relative; width: fit-content; height: fit-content"><img style="max-height: 50px; max-width: 50px" src="' + this.accounts[i].image + '"/>';
        members += '<div class="table" id="profileDarkener" style="display: none; text-align: center; background-color: black; opacity: 0.5; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%"><i style="vertical-align: middle; color: red" class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div></div></td>';
        members += '<td style="vertical-align: middle;">' + this.accounts[i].firstname + '</td>';
        members += '<td style="vertical-align: middle;">' + this.accounts[i].lastname + '</td>';
        members += '<td style="vertical-align: middle;">' + this.accounts[i].pseudo + '</td>';
        members += '</tr>';
        document.getElementById('membersTableBody').innerHTML += members;
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

  public showSolutionsModal(): void {
    if (this.currentTeam && this.currentTeam.solutions.length > 0) {
      $('#no-solutions-text').addClass('hide');
    } else {
      $('#solutions-table').addClass('hide');
    }
    $(this._solutionsModal.nativeElement).modal('show');
  }

  public showUploadModal(): void {
    $(this._solutionsModal.nativeElement).modal('hide');
    $(this._uploadModal.nativeElement).modal('show');
  }

  private getAccountFromAccountId(accountId: number): Account {
    const account: Account = this.challenge.organizers.find(accountEl => accountEl.accountId === accountId);
    return typeof account !== 'undefined' ? account : null;
  }

  private checkPartOfThisChallenge(): void {
    if (typeof this.challenge !== 'undefined' && typeof this.account !== 'undefined') {
      const teams: Set<number> = new Set(this.account.teams.map(t => t.teamId));
      const filteredTeams: Team[] = this.challenge.participants.filter(t => teams.has(t.teamId));
      if (filteredTeams.length > 0) {
        this.currentTeam = filteredTeams[0];
        this.isPartOfThisChallenge = true;
      }
    }
  }

  private enableFileEvent(): void {
    $(document).on('change', ':file', function () {
      const input: JQuery = $(this);
      const numFiles = (<any>input.get(0)).files ? (<any>input.get(0)).files.length : 1;
      const label: string = (<string>input.val()).replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });

    $('input:file').on('fileselect', function (event, numFiles, label) {
      $('#file-name').text(label);
      console.log(label);
    });
  }

  private generateClassement(): void {

    if (this.challenge) {

      this.classementProv = this.challenge.participants;

      while (this.classementProv.length > 0) {
        let bestTeam: Team = null;
        let bestSolutionOfBestTeam: Solution = null;
        for (const entry of this.classementProv) {
          if (!bestTeam) {
            bestTeam = entry;
            bestSolutionOfBestTeam = this.getBestSolutionOfTeam(bestTeam);
          } else {
            const bestSolutionOfOneTeam: Solution = this.getBestSolutionOfTeam(entry);
            if (bestSolutionOfBestTeam.ranking < bestSolutionOfOneTeam.ranking) {
              bestTeam = entry;
              bestSolutionOfBestTeam = bestSolutionOfOneTeam;
            } else if (bestSolutionOfBestTeam.ranking === bestSolutionOfOneTeam.ranking) {
              if (bestTeam.solutions.length > entry.solutions.length) {
                bestTeam = entry;
                bestSolutionOfBestTeam = bestSolutionOfOneTeam;
              }
            }
          }
        }
        this.classement.push(bestTeam);
        const index = this.classementProv.indexOf(bestTeam, 0);
        this.classementProv.splice(index, 1);
      }
    }
  }

  private getBestSolutionOfTeam(team: Team): Solution {
    let bestSol: Solution = null;

    for (const entry of team.solutions) {
      if (!bestSol) {
        bestSol = entry;
      } else {
        if (bestSol.ranking < entry.ranking) {
          bestSol = entry;
        }
      }
    }
    return bestSol;
  }
}
