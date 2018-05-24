import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {Token} from '../../model/Token';
import * as $ from 'jquery';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _accountService: AccountService) {
  }

  public ngOnInit(): void {
    console.log(this._activatedRoute.snapshot.params['token']);
    const message: JQuery = $('#message');
    this._accountService.validate(new Token(this._activatedRoute.snapshot.params['token']))
      .then(() => message.text('Votre email a été validé avec succès !'))
      .catch(() => message.text('Erreur lors de la validation de l\'email'));
  }
}
