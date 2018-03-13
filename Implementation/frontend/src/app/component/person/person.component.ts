import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../service/person.service';
import {Person} from '../../model/Person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @ViewChild('form')
  public form: ElementRef;

  public persons: Person[];

  public personLastname: string;
  public personFirstname: string;

  constructor(private personService: PersonService) {
  }

  public ngOnInit(): void {
    this.personService.getPersons().then(resp => this.persons = resp);
  }

  public createPerson(): void {
    if (typeof this.personLastname !== 'undefined' && typeof this.personFirstname !== 'undefined') {
      const newPerson: Person = new Person(this.personLastname, this.personFirstname);
      this.personService.createPerson(newPerson).then(resp => this.persons.push(resp));
      this.clearForm();
    }
  }

  private clearForm(): void {
    this.personLastname = undefined;
    this.personFirstname = undefined;
    for (const input of this.form.nativeElement.getElementsByTagName('input')) {
      input.value = '';
    }
  }
}
