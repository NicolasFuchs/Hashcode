import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Challenge} from '../model/Challenge';

@Injectable()
export class ChallengeService {

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public constructor(private _httpClient: HttpClient) {
  }

  public getActualChallenge(): Promise<Challenge> {
    return this._httpClient.get('http://localhost:8080/challenges/actual')
      .toPromise()
      .then(response => response as Challenge)
      .catch(ChallengeService.handleError);
  }
}