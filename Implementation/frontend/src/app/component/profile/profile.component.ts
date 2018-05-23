import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {AccountService} from '../../service/account.service';
import {Account} from '../../model/Account';
import {ActivatedRoute} from '@angular/router';
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
  private pseudoDisabled: boolean;
  private emailDisabled: boolean;
  private passwordDisabled: boolean;
  private disabledNumber: number;

  @ViewChild('pseudo') private _pseudo: ElementRef;
  @ViewChild('email') private _email: ElementRef;
  @ViewChild('pass') public _password: ElementRef;
  @ViewChild('passConf') public _passwordConfirmation: ElementRef;
  @ViewChild('submit') private _submit: ElementRef;

  constructor(private _authenticationService: AuthenticationService, private _activatedRoute: ActivatedRoute, private _accountService: AccountService) {
    this.pseudoDisabled = this.emailDisabled = this.passwordDisabled = false;
    this.disabledNumber = 0;
    this.imgSrc = '../../assets/Profile.PNG';
  }

  public ngOnInit(): void {
    this._activatedRoute.data.subscribe(value => this.signup = value.signup);
    this.account = this._authenticationService.actual;
    this._authenticationService.account.subscribe(account => this.account = account);
  }

  public changeImageURL(event: any): void {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (!this.signup) {
            this.account.image = reader.result;
          } else {
            this.imgSrc = reader.result;
          }
        };
      }
  }

  public checkPseudo(event: any): void {
    this._accountService.getAccountByPseudo(event.target.value).then(account => {
      console.log(account);
      if (event.target.value === '' || (account !== null && this.account.accountId !== account.accountId)) {  // origin : event.target.value !== '' && (account === null || this.account.accountId === account.accountId)
        $(this._pseudo.nativeElement).removeClass('is-valid');
        $(this._pseudo.nativeElement).addClass('is-invalid');
        $(this._submit.nativeElement).attr('disabled', 'true');
        if (!this.pseudoDisabled) {
          this.disabledNumber++;
        }
        this.pseudoDisabled = true;
      } else {
        $(this._pseudo.nativeElement).removeClass('is-invalid');
        $(this._pseudo.nativeElement).addClass('is-valid');
        if (this.disabledNumber === 1 && this.pseudoDisabled) {
          $(this._submit.nativeElement).removeAttr('disabled');
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
      $(this._submit.nativeElement).attr('disabled', 'true');
      if (!this.emailDisabled) {
        this.disabledNumber++;
      }
      this.emailDisabled = true;
    } else {
      $(this._email.nativeElement).removeClass('is-invalid');
      $(this._email.nativeElement).addClass('is-valid');
      if (this.disabledNumber === 1 && this.emailDisabled) {
        $(this._submit.nativeElement).removeAttr('disabled');
      }
      if (this.emailDisabled) {
        this.disabledNumber--;
      }
      this.emailDisabled = false;
    }
  }

  public checkPassword(): void {
    if (this._password.nativeElement.value !== this._passwordConfirmation.nativeElement.value) {
      $(this._password.nativeElement).removeClass('is-valid');
      $(this._passwordConfirmation.nativeElement).removeClass('is-valid');
      $(this._password.nativeElement).addClass('is-invalid');
      $(this._passwordConfirmation.nativeElement).addClass('is-invalid');
      $(this._submit.nativeElement).attr('disabled', 'true');
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
        $(this._submit.nativeElement).removeAttr('disabled');
      }
      if (this.passwordDisabled) {
        this.disabledNumber--;
      }
      this.passwordDisabled = false;
    }
  }

  public saveProfile(): void {
    this.account.pseudo = this._pseudo.nativeElement.value;
    this.account.email = this._email.nativeElement.value;
    if (this._password.nativeElement.value !== '') {
      this.account.password = this._password.nativeElement.value;
    }
    this._accountService.updateAccount(this.account);
    console.log('submit');
  }

}
