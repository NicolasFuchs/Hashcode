import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Solution} from '../model/Solution';

const baseUrl = 'http://localhost:8080/files';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) {
  }

  public uploadFile(solution: Solution): Promise<void> {
    return this.http.post(baseUrl, JSON.stringify(solution), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
