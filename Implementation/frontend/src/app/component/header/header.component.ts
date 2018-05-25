import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationInterceptor} from '../../interceptor/authentication.interceptor';
import {AuthenticationService} from '../../service/authentication.service';
import {LocalStorageService} from 'ngx-localstorage';
import {Account} from '../../model/Account';
import * as $ from 'jquery';
import 'bootstrap';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public account: Account;

  public msgError:string;

  private _isModalShowed: boolean;

  @ViewChild('signModal') private _signModal: ElementRef;
  @ViewChild('pseudoInput') private _pseudoInput: ElementRef;
  @ViewChild('passwordInput') private _passwordInput: ElementRef;

  public constructor(private _authenticationService: AuthenticationService,
                     private _authenticationInterceptor: AuthenticationInterceptor,
                     private _localStorageService: LocalStorageService, private _route: Router,
                     private _location: Location) {
    this._isModalShowed = false;
  }

  public ngOnInit(): void {
    // Listening events
    this.msgError = "";
    this._authenticationService.account.subscribe(account => this.account = account);
    this._authenticationInterceptor.errors.subscribe(err => {
      if (err.status === 401 || err.status === 403) {
        if (this._isModalShowed) {
          $(this._pseudoInput.nativeElement).addClass('is-invalid');
          $(this._passwordInput.nativeElement).addClass('is-invalid');
          if(err.status === 401){
            this.msgError = "Nom d'utilisateur et/ou mot de passe incorrect";
          }else{
            this.msgError = "Votre compte n'a pas été encore validé, si vous êtes un challengeur veuillez vérifier votre messagerie";
          }
        } else {
          this.showSignModal();
        }
      }
    });

    // Check for token in LocalStorage
    if (this._localStorageService.get('token') !== null) {
      this._authenticationService.loginWithToken();
    }
  }

  public isLogged(): boolean {
    return typeof this.account !== 'undefined';
  }

  public showSignModal(): void {
    $(this._signModal.nativeElement).modal('show');
    this._isModalShowed = true;
  }

  public hideSignModal(): void {
    $(this._signModal.nativeElement).modal('hide');
    this._isModalShowed = false;
  }

  public login(): void {
    const pseudo: string = this._pseudoInput.nativeElement.value;
    const password: string = this._passwordInput.nativeElement.value;
    this._authenticationService.login(pseudo, password).then(() => {
      $(this._pseudoInput.nativeElement).removeClass('is-invalid');
      $(this._passwordInput.nativeElement).removeClass('is-invalid');
      this.hideSignModal();
      if (this._location.path() === '/signup') {
        this._route.navigate(['profile']);
      }
    });
  }

  public logout(): void {
    this._authenticationService.logout();
  }
}
