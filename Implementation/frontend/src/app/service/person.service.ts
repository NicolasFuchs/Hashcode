import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Person} from '../model/person';

const baseUrl = 'http://localhost:8080/persons';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) {
  }

  public getPersons(): Promise<Person[]> {
    return this.http.get(baseUrl)
      .toPromise()
      .then(response => response as Person[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
