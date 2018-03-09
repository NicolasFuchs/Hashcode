import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../service/person.service';
import {Person} from '../../model/Person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public persons: Person[];

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.getPersons().then(resp => this.persons = resp);
  }

}
