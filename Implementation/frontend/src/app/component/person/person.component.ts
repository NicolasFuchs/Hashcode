import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PersonService} from '../../service/person.service';
import {Person} from '../../model/Person';

declare var $: any;

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public persons: Person[];

  @ViewChild('modalRef') public modalRef: ElementRef;
  @ViewChild('personLastnameRef') public personLastnameRef: ElementRef;
  @ViewChild('personFirstnameRef') public personFirstnameRef: ElementRef;

  public personLastname: string;
  public personFirstname: string;

  private currentIndex: number;

  constructor(private personService: PersonService) {
    this.clearData();
  }

  public ngOnInit(): void {
    this.personService.getPersons().then(resp => this.persons = resp);
  }

  public openModalWithoutInfos(): void {
    this.clearData();
    this.personLastnameRef.nativeElement.value = '';
    this.personFirstnameRef.nativeElement.value = '';
    $(this.modalRef.nativeElement).modal();
  }

  public openModalWithInfos(index: number): void {
    this.clearData();
    this.currentIndex = index;
    this.personLastnameRef.nativeElement.value = this.persons[this.currentIndex].lastname;
    this.personFirstnameRef.nativeElement.value = this.persons[this.currentIndex].firstname;
    $(this.modalRef.nativeElement).modal();
  }

  public savePerson(): void {
    if (this.currentIndex === -1) {
      this.createPerson();
    } else {
      this.updatePerson();
    }
  }

  public deletePerson(index: number): void {
    this.personService.deletePerson(this.persons[index]).then(() => this.persons.splice(index, 1));
  }

  private createPerson(): void {
    if (this.personLastname !== '' && this.personFirstname !== '') {
      const newPerson: Person = new Person();
      newPerson.lastname = this.personLastname;
      newPerson.firstname = this.personFirstname;
      this.personService.createPerson(newPerson).then(resp => this.persons.push(resp));
    }
  }

  private updatePerson(): void {
    if (this.personLastname !== '' || this.personFirstname !== '') {
      const updatedPerson: Person = new Person();
      updatedPerson.personId = this.persons[this.currentIndex].personId;
      updatedPerson.lastname = this.personLastname !== '' ? this.personLastname : this.persons[this.currentIndex].lastname;
      updatedPerson.firstname = this.personFirstname !== '' ? this.personFirstname : this.persons[this.currentIndex].firstname;
      this.personService.updatePerson(updatedPerson).then(resp => this.persons[this.currentIndex] = resp);
    }
  }

  private clearData(): void {
    this.currentIndex = -1;
    this.personLastname = '';
    this.personFirstname = '';
  }
}
