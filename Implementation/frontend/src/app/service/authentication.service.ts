import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../model/Account';

@Injectable()
export class AuthenticationService {

  public actual: Account;
  public account: EventEmitter<Account>;

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public constructor(private http: HttpClient) {
    this.account = new EventEmitter<Account>();
  }

  public login(pseudo: string, password: string): Promise<void> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(pseudo + ':' + password));
    return this.http.get('http://localhost:8080/auth/login', {headers: headers})
      .toPromise()
      .then(response => {
        const account: Account = response as Account;
        this.actual = account;
        this.account.emit(account);
      })
      .catch(AuthenticationService.handleError);
  }

  public logout(): Promise<void> {
    return this.http.get('http://localhost:8080/auth/logout')
      .toPromise()
      .then(() => {
        this.actual = undefined;
        this.account.emit(undefined);
      })
      .catch(AuthenticationService.handleError);
  }
}
