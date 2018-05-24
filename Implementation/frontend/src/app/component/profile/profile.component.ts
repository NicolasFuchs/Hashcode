import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {AccountService} from '../../service/account.service';
import {Account} from '../../model/Account';
import {ActivatedRoute} from '@angular/router';
import {Roles} from '../../constant/roles';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public signup: boolean;
  public account: Account;

  public imgSrc: string;
  private lastnameDisabled: boolean;
  private firstnameDisabled: boolean;
  private pseudoDisabled: boolean;
  private emailDisabled: boolean;
  private passwordDisabled: boolean;
  private disabledNumber: number;

  @ViewChild('lastname') public _lastname: ElementRef;
  @ViewChild('firstname') public _firstname: ElementRef;
  @ViewChild('pseudo') private _pseudo: ElementRef;
  @ViewChild('email') private _email: ElementRef;
  @ViewChild('pass') public _password: ElementRef;
  @ViewChild('passConf') public _passwordConfirmation: ElementRef;
  @ViewChild('updateProfileButton') private _updateProfileButton: ElementRef;
  @ViewChild('createProfileButton') private _createProfileButton: ElementRef;
  @ViewChild('accountInstructions') private _instructionsModal: ElementRef;

  constructor(private _authenticationService: AuthenticationService, private _activatedRoute: ActivatedRoute,
              private _accountService: AccountService) {
    this.disabledNumber = 0;
    this.imgSrc = '../../assets/Profile.PNG';
  }

  public ngOnInit(): void {
    this._activatedRoute.data.subscribe(value => this.signup = value.signup);
    this.account = this._authenticationService.actual;
    this._authenticationService.account.subscribe(account => this.account = account);
    if (typeof this.account === 'undefined') {
      this.account = new Account();
    }
    if (this.signup) {
      this.lastnameDisabled = this.firstnameDisabled = this.pseudoDisabled = this.emailDisabled = this.passwordDisabled = true;
      this.disabledNumber = 5;
      const componentThis = this;
      $(function () {
        $(componentThis._createProfileButton.nativeElement).attr('disabled', 'true');
      });
    } else {
      this.lastnameDisabled = this.firstnameDisabled = this.pseudoDisabled = this.emailDisabled = this.passwordDisabled = false;
    }
  }

  public changeImageURL(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => this.account.image = reader.result;
    }
  }

  public checkLastname(event: any): void {
    if (event.target.value === '') {
      $(this._lastname.nativeElement).removeClass('is-valid');
      $(this._lastname.nativeElement).addClass('is-invalid');
      if (!this.signup) {
        $(this._updateProfileButton.nativeElement).attr('disabled', 'true');
      } else {
        $(this._createProfileButton.nativeElement).attr('disabled', 'true');
      }
      if (!this.lastnameDisabled) {
        this.disabledNumber++;
      }
      this.lastnameDisabled = true;
    } else {
      $(this._lastname.nativeElement).removeClass('is-invalid');
      $(this._lastname.nativeElement).addClass('is-valid');
      if (this.disabledNumber === 1 && this.lastnameDisabled) {
        if (!this.signup) {
          $(this._updateProfileButton.nativeElement).removeAttr('disabled');
        } else {
          $(this._createProfileButton.nativeElement).removeAttr('disabled');
        }
      }
      if (this.lastnameDisabled) {
        this.disabledNumber--;
      }
      this.lastnameDisabled = false;
    }
  }

  public checkFirstname(event: any): void {
    if (event.target.value === '') {
      $(this._firstname.nativeElement).removeClass('is-valid');
      $(this._firstname.nativeElement).addClass('is-invalid');
      if (!this.signup) {
        $(this._updateProfileButton.nativeElement).attr('disabled', 'true');
      } else {
        $(this._createProfileButton.nativeElement).attr('disabled', 'true');
      }
      if (!this.firstnameDisabled) {
        this.disabledNumber++;
      }
      this.firstnameDisabled = true;
    } else {
      $(this._firstname.nativeElement).removeClass('is-invalid');
      $(this._firstname.nativeElement).addClass('is-valid');
      if (this.disabledNumber === 1 && this.firstnameDisabled) {
        if (!this.signup) {
          $(this._updateProfileButton.nativeElement).removeAttr('disabled');
        } else {
          $(this._createProfileButton.nativeElement).removeAttr('disabled');
        }
      }
      if (this.firstnameDisabled) {
        this.disabledNumber--;
      }
      this.firstnameDisabled = false;
    }
  }

  public checkPseudo(event: any): void {
    this._accountService.getAccountByPseudo(event.target.value).then(account => {
      if (event.target.value === '' || (account !== null && this.account.accountId !== account.accountId)) {
        $(this._pseudo.nativeElement).removeClass('is-valid');
        $(this._pseudo.nativeElement).addClass('is-invalid');
        if (!this.signup) {
          $(this._updateProfileButton.nativeElement).attr('disabled', 'true');
        } else {
          $(this._createProfileButton.nativeElement).attr('disabled', 'true');
        }
        if (!this.pseudoDisabled) {
          this.disabledNumber++;
        }
        this.pseudoDisabled = true;
      } else {
        $(this._pseudo.nativeElement).removeClass('is-invalid');
        $(this._pseudo.nativeElement).addClass('is-valid');
        if (this.disabledNumber === 1 && this.pseudoDisabled) {
          if (!this.signup) {
            $(this._updateProfileButton.nativeElement).removeAttr('disabled');
          } else {
            $(this._createProfileButton.nativeElement).removeAttr('disabled');
          }
        }
        if (this.pseudoDisabled) {
          this.disabledNumber--;
        }
        this.pseudoDisabled = false;
      }
    });
  }

  public checkEmail(event: any): void {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
      $(this._email.nativeElement).removeClass('is-valid');
      $(this._email.nativeElement).addClass('is-invalid');
      if (!this.signup) {
        $(this._updateProfileButton.nativeElement).attr('disabled', 'true');
      } else {
        $(this._createProfileButton.nativeElement).attr('disabled', 'true');
      }
      if (!this.emailDisabled) {
        this.disabledNumber++;
      }
      this.emailDisabled = true;
    } else {
      $(this._email.nativeElement).removeClass('is-invalid');
      $(this._email.nativeElement).addClass('is-valid');
      if (this.disabledNumber === 1 && this.emailDisabled) {
        if (!this.signup) {
          $(this._updateProfileButton.nativeElement).removeAttr('disabled');
        } else {
          $(this._createProfileButton.nativeElement).removeAttr('disabled');
        }
      }
      if (this.emailDisabled) {
        this.disabledNumber--;
      }
      this.emailDisabled = false;
    }
  }

  public checkPassword(): void {
    if ((this._password.nativeElement.value !== this._passwordConfirmation.nativeElement.value) ||
      (this.signup && this._password.nativeElement.value === '')) {
      $(this._password.nativeElement).removeClass('is-valid');
      $(this._passwordConfirmation.nativeElement).removeClass('is-valid');
      $(this._password.nativeElement).addClass('is-invalid');
      $(this._passwordConfirmation.nativeElement).addClass('is-invalid');
      if (!this.signup) {
        $(this._updateProfileButton.nativeElement).attr('disabled', 'true');
      } else {
        $(this._createProfileButton.nativeElement).attr('disabled', 'true');
      }
      if (!this.passwordDisabled) {
        this.disabledNumber++;
      }
      this.passwordDisabled = true;
    } else {
      $(this._password.nativeElement).removeClass('is-invalid');
      $(this._passwordConfirmation.nativeElement).removeClass('is-invalid');
      $(this._password.nativeElement).addClass('is-valid');
      $(this._passwordConfirmation.nativeElement).addClass('is-valid');
      if (this.disabledNumber === 1 && this.passwordDisabled) {
        if (!this.signup) {
          $(this._updateProfileButton.nativeElement).removeAttr('disabled');
        } else {
          $(this._createProfileButton.nativeElement).removeAttr('disabled');
        }
      }
      if (this.passwordDisabled) {
        this.disabledNumber--;
      }
      this.passwordDisabled = false;
    }
  }

  public saveProfile(): void {
    this.account.lastname = this._lastname.nativeElement.value;
    this.account.firstname = this._firstname.nativeElement.value;
    this.account.pseudo = this._pseudo.nativeElement.value;
    this.account.email = this._email.nativeElement.value;
    if (!this.signup) {
      if (this._password.nativeElement.value !== '') {
        this.account.password = this._password.nativeElement.value;
      }
      this._accountService.updateAccount(this.account);
    } else {
      if ((<any>$('#cha')[0]).checked) {
        this.account.role = Roles.PENDING_USER;
      } else {
        this.account.role = Roles.PENDING_ORGANIZER;
      }
      this.account.pseudo = this._pseudo.nativeElement.value;
      this.account.email = this._email.nativeElement.value;
      if (this._password.nativeElement.value !== '') {
        this.account.password = this._password.nativeElement.value;
      }
      this._accountService.signup(this.account);
      $(this._instructionsModal.nativeElement).modal('show');
    }
  }

  public instructionsOK(): void {
    $(this._instructionsModal.nativeElement).modal('hide');
  }

  public getProfilePicture(): string {
    if (typeof this.account !== 'undefined' && typeof this.account.image !== 'undefined') {
      return this.account.image;
    }
    return '../../assets/Profile.PNG';
  }
}
