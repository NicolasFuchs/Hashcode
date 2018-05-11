import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
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

  @ViewChild('pass') private _password: ElementRef;
  @ViewChild('passConf') private _passwordConfirmation: ElementRef;

  constructor(private _authenticationService: AuthenticationService, private _activatedRoute: ActivatedRoute) {
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
  }

}
