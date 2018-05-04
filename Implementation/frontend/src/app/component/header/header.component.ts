import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationInterceptor} from '../../interceptor/authentication.interceptor';
import {AuthenticationService} from '../../service/authentication.service';

import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public account: Account;

  private _isModalShowed: boolean;

  @ViewChild('signModal') private signModal: ElementRef;
  @ViewChild('pseudoInput') private pseudoInput: ElementRef;
  @ViewChild('passwordInput') private passwordInput: ElementRef;

  public constructor(private _authenticationService: AuthenticationService,
                     private _authenticationInterceptor: AuthenticationInterceptor) {
    this._isModalShowed = false;
  }

  public ngOnInit(): void {
    this._authenticationService.account.subscribe(account => this.account = account);
    this._authenticationInterceptor.errors.subscribe(err => {
      if (err.status === 401) {
        if (this._isModalShowed) {
          $(this.pseudoInput.nativeElement).addClass('is-invalid');
          $(this.passwordInput.nativeElement).addClass('is-invalid');
        } else {
          this.showSignModal();
        }
      }
    });
  }

  public isLogged(): boolean {
    return typeof this.account !== 'undefined';
  }

  public showSignModal(): void {
    $(this.signModal.nativeElement).modal('show');
    this._isModalShowed = true;
  }

  public login(): void {
    const pseudo: string = this.pseudoInput.nativeElement.value;
    const password: string = this.passwordInput.nativeElement.value;
    this._authenticationService.login(pseudo, password).then(() => {
      $(this.signModal.nativeElement).modal('hide');
      $(this.pseudoInput.nativeElement).removeClass('is-invalid');
      $(this.passwordInput.nativeElement).removeClass('is-invalid');
    });
  }

  public logout(): void {
    this._authenticationService.logout();
  }
}
