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
      .then(response => {
        const persons: Person[] = response as Person[];
        persons.forEach(person => person.birthday = new Date(person.birthday));
        return persons;
      })
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

  public deletePerson(person: Person): Promise<void> {
    const url = `${baseUrl}/${person.personId}`;
    return this.http.delete(url, {headers: {'Content-Type': 'application/json'}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
