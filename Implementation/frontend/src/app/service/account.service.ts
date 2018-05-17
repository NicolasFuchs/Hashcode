import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../model/Account';
import {Role} from '../model/Role';

const baseUrl = 'http://localhost:8080/accounts';

@Injectable()
export class AccountService {



  constructor(private _httpClient: HttpClient) { }

  private static handleError(error: any): Promise<any> {
     return Promise.reject(error);
   }


  public getOrganizerPending(): Promise<Account[]> {
    return this._httpClient.get(baseUrl+'/organizerpending')
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
          //personResp.birthday = new Date(personResp.birthday);
          //accountResp.role = new Role();
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