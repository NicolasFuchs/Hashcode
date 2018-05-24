import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';
import {isNullOrUndefined} from 'util';
import {Account} from '../../model/Account';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})

export class ChallengesComponent implements OnInit {

  @ViewChild('createChallengeModal') private _createChallengeModal: ElementRef;
  @ViewChild('inscriptionDate') private _inscriptionDate: ElementRef;
  @ViewChild('beginDate') private _beginDate: ElementRef;
  @ViewChild('endDate') private _endDate: ElementRef;
  @ViewChild('organizersTableBody') private _organizersTableBody: ElementRef;

  public time: string;
  private accounts: Account[];

  constructor(private _accountService: AccountService) {
    this.time = 'actual';
  }

  public ngOnInit(): void {
    const today = new Date();
    const date = today.getDate();
    const dd = (date < 10) ? '0' + date : date;
    const month = today.getMonth() + 1;
    const mm = (month < 10) ? '0' + month : month;
    const yyyy = today.getFullYear();
    const componentThis = this;
    $(function() {
      $(componentThis._inscriptionDate.nativeElement).attr('min', yyyy + '-' + mm + '-' + dd);
      $(componentThis._beginDate.nativeElement).attr('min', yyyy + '-' + mm + '-' + dd);
      $(componentThis._endDate.nativeElement).attr('min', yyyy + '-' + mm + '-' + dd);
    });
  }

  public setInscriptionDateConstraint(): void {
    if (!isNullOrUndefined(this._beginDate.nativeElement.value)) {
      $(this._inscriptionDate.nativeElement).attr('max', this._beginDate.nativeElement.value);
    }
  }

  public setBeginDateConstraint(): void {
    if (!isNullOrUndefined(this._inscriptionDate.nativeElement.value)) {
      $(this._beginDate.nativeElement).attr('min', this._inscriptionDate.nativeElement.value);
    }
    if (!isNullOrUndefined(this._endDate.nativeElement.value)) {
      $(this._beginDate.nativeElement).attr('max', this._endDate.nativeElement.value);
    }
  }

  public setEndDateConstraint(): void {
    if (!isNullOrUndefined(this._beginDate.nativeElement.value)) {
      $(this._endDate.nativeElement).attr('min', this._beginDate.nativeElement.value);
    }
  }

  public checkChallengeName(): void {
    console.log('challenge name check');
  }

  public showTrash(event: any): void {
    console.log('show trash');
  }

  public hideTrash(event: any): void {
    console.log('hide trash');
  }

  public addPotentialOrganizers(): void {
    this._accountService.getAllOrganizers().then(accounts => {
      this.accounts = accounts;
      let options = '';
      for (let i = 0; i < accounts.length; i++) {
        options += '<option value="' + accounts[i].pseudo + '" />';
      }
      document.getElementById('organizers').innerHTML = options;
    });
  }

  public addOrganizer(): void {
    console.log('add organizer');
    for (let i = 0; i < this.accounts.length; i++) {
      const pseudo: string = (document.getElementById('addOrganizer') as HTMLInputElement).value;
      if (this.accounts[i].pseudo === pseudo) {
        let organizers = '<tr>';
        organizers += '<td style="vertical-align: middle;"><div style="position: relative; width: fit-content; height: fit-content"><img style="max-height: 50px; max-width: 50px" src="' + this.accounts[i].image + '"/>';
        organizers += '<div class="table" id="profileDarkener" style="display: none; text-align: center; background-color: black; opacity: 0.5; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%"><i style="vertical-align: middle; color: red" class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div></div></td>';
        organizers += '<td style="vertical-align: middle;">' + this.accounts[i].firstname + '</td>';
        organizers += '<td style="vertical-align: middle;">' + this.accounts[i].lastname + '</td>';
        organizers += '<td style="vertical-align: middle;">' + this.accounts[i].pseudo + '</td>';
        organizers += '</tr>';
        console.log(document.getElementById('organizersTableBody').innerHTML);
        document.getElementById('organizersTableBody').innerHTML += organizers;
        break;
      }
    }
  }

  public addDataFile(event: any): void {
    // const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      document.getElementById('dataTableBody').innerHTML += '<tr><td>' + file.name + '</td></tr>';
      // reader.readAsDataURL(file);
      // reader.onload = () => this.account.image = reader.result;
    }
  }

  public addPictureFile(event: any): void {
    // const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      document.getElementById('pictureTableBody').innerHTML += '<tr><td>' + file.name + '</td></tr>';
      // reader.readAsDataURL(file);
      // reader.onload = () => this.account.image = reader.result;
    }
  }

  public addVideoFile(event: any): void {
    // const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      document.getElementById('videoTableBody').innerHTML += '<tr><td>' + file.name + '</td></tr>';
      // reader.readAsDataURL(file);
      // reader.onload = () => this.account.image = reader.result;
    }
  }

  public createChallenge(): void {
    console.log('create challenge');
  }

  public showCreateChallengeModal(): void {
    $('#createChallengeModal').modal('show');
    // $(this._createChallengeModal.nativeElement).dialog('option',);
  }

}
