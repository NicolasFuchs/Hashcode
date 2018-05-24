import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Account} from '../model/Account';
import {Token} from '../model/Token';

const baseUrl = 'http://localhost:8080/accounts';

@Injectable()
export class AccountService {
  [x: string]: any;


  constructor(private _httpClient: HttpClient) {
  }

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public signup(account: Account): Promise<void> {
    return this._httpClient
      .put(baseUrl + '/signup', JSON.stringify(account), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  public validate(token: Token): Promise<void> {
    return this._httpClient
      .put(baseUrl + '/validate', JSON.stringify(token), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  public getAllChallengers(): Promise<Account[]> {
    return this._httpClient.get(baseUrl + '/all')
      .toPromise()
      .then(response => response as Account[])
      .catch(AccountService.handleError);
  }

  public getAllOrganizers(): Promise<Account[]> {
    return this._httpClient.get(baseUrl + '/organizers')
      .toPromise()
      .then(response => response as Account[])
      .catch(AccountService.handleError);
  }

  public getAccountByPseudo(pseudo: string): Promise<Account> {
    const params = new HttpParams().set('pseudo', pseudo);
    return this._httpClient.get(baseUrl + '/pseudo', {params})
      .toPromise()
      .then(response => response as Account)
      .catch(AccountService.handleError);
  }

  public updateAccount(account: Account): void {
    this._httpClient.put(baseUrl + '/profileUpdate', JSON.stringify(account), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  public getOrganizerPending(): Promise<Account[]> {
    return this._httpClient.get(baseUrl + '/organizerpending')
      .toPromise()
      .then(response => response as Account[])
      .catch(AccountService.handleError);
  }

  public updateOrganizerPending(account: Account): Promise<Account> {
    return this._httpClient
      .put(baseUrl, JSON.stringify(account), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(response => {
        const accountResp: Account = response as Account;
        return accountResp;
      })
      .catch(this.handleError);

  }

  public deleteOrganizerPending(account: Account): Promise<void> {
    const url = `${baseUrl}/${account.accountId}`;
    return this._httpClient.delete(url, {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

}
