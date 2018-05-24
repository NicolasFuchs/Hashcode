import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Team} from '../model/Team';

const baseUrl = 'http://localhost:8080/teams';

@Injectable()
export class TeamService {

  constructor(private _httpClient: HttpClient) {
  }

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public createTeam(team: Team): void {
    this._httpClient.put(baseUrl, JSON.stringify(team), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(TeamService.handleError);
  }
}
