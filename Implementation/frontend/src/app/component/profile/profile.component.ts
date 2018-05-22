import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Account} from '../../model/Account';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../service/account.service';
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

  @ViewChild('pass') private _password: ElementRef;
  @ViewChild('passConf') private _passwordConfirmation: ElementRef;

  constructor(private _authenticationService: AuthenticationService,
              private _accountService: AccountService,
              private _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._activatedRoute.data.subscribe(value => this.signup = value.signup);
    this.account = this._authenticationService.actual;
    this._authenticationService.account.subscribe(account => this.account = account);
    if (typeof this.account === 'undefined') {
      this.account = new Account();
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

  public checkPasswordConfirmation(event: any): void {
    if (event.target.value !== this.account.password) {
      console.log('password and confirmation not the same!');
      $(this._password.nativeElement).addClass('is-invalid');
      $(this._passwordConfirmation.nativeElement).addClass('is-invalid');
    } else {
      $(this._password.nativeElement).removeClass('is-invalid');
      $(this._passwordConfirmation.nativeElement).removeClass('is-invalid');
      $(this._password.nativeElement).addClass('is-valid');
      $(this._passwordConfirmation.nativeElement).addClass('is-valid');
    }
  }

  public submit(): void {
    console.log('submit');
    if (this.signup && this.checkForm()) {
      if ((<any>$('#cha')[0]).checked) {
        this.account.role = Roles.PENDING_USER;
      } else {
        this.account.role = Roles.PENDING_ORGANIZER;
      }
      this._accountService.signup(this.account);
    }
  }

  public getProfilePicture(): string {
    if (typeof this.account !== 'undefined' && typeof this.account.image !== 'undefined') {
      return this.account.image;
    }
    return '../../assets/Profile.PNG';
  }

  public checkForm(): boolean {
    const lastname: JQuery = $('#lastname');
    const firstname: JQuery = $('#firstname');
    const pseudo: JQuery = $('#pseudo');
    const email: JQuery = $('#email');
    const password: JQuery = $('#password');
    const passwordConfirmation: JQuery = $('#password-confirmation');

    lastname.removeClass('is-invalid');
    firstname.removeClass('is-invalid');
    pseudo.removeClass('is-invalid');
    email.removeClass('is-invalid');

    let isValid = true;
    if (this.account.lastname === '') {
      lastname.addClass('is-invalid');
      isValid = isValid && false;
    }
    if (this.account.firstname === '') {
      firstname.addClass('is-invalid');
      isValid = isValid && false;
    }
    if (this.account.pseudo === '') {
      pseudo.addClass('is-invalid');
      isValid = isValid && false;
    }
    if (!this.isEmailValid()) {
      email.addClass('is-invalid');
      isValid = isValid && false;
    }
    if (this.account.password === '' || password.val() !== passwordConfirmation.val()) {
      password.addClass('is-invalid');
      passwordConfirmation.addClass('is-invalid');
      isValid = isValid && false;
    }
    return isValid;
  }

  private isEmailValid(): boolean {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.account.email);
  }
}
