import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Person} from '../model/Person';

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

  public createPerson(person: Person): Promise<Person> {
    return this.http
      .post(baseUrl, JSON.stringify(person), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(response => response as Person)
      .catch(this.handleError);
  }

  public updatePerson(person: Person): Promise<Person> {
    return this.http
      .put(baseUrl, JSON.stringify(person), {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(response => response as Person)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
