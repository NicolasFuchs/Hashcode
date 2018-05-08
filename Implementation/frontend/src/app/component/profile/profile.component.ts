import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Account} from '../../model/Account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public account: Account;

  constructor(private _authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.account = this._authenticationService.actual;
    this._authenticationService.account.subscribe(account => this.account = account);
  }

  public changeImageURL(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.account.image = reader.result;
      };
    }
  }

}
