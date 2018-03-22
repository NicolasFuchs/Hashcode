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
  @ViewChild('personBirthdayRef') public personBirthdayRef: ElementRef;

  public personLastname: string;
  public personFirstname: string;
  public personBirthday: string;
  public isBirthdayFormatValid: boolean;

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
    this.personBirthdayRef.nativeElement.value = '';
    $(this.modalRef.nativeElement).modal();
  }

  public openModalWithInfos(index: number): void {
    this.clearData();
    this.currentIndex = index;
    this.personLastnameRef.nativeElement.value = this.persons[this.currentIndex].lastname;
    this.personFirstnameRef.nativeElement.value = this.persons[this.currentIndex].firstname;
    this.personBirthdayRef.nativeElement.value = this.persons[this.currentIndex].birthday
      .toLocaleDateString().replace(/\//g, '.');
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

  public checkDateFormat(date: string): void {
    this.isBirthdayFormatValid = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/.test(date);
  }

  private createPerson(): void {
    if (this.personLastname !== '' && this.personFirstname !== '' && this.personBirthday !== '') {
      const newPerson: Person = new Person();
      newPerson.lastname = this.personLastname;
      newPerson.firstname = this.personFirstname;
      newPerson.birthday = new Date(this.personBirthday);
      this.personService.createPerson(newPerson).then(resp => this.persons.push(resp));
    }
  }

  private updatePerson(): void {
    if (this.personLastname !== '' || this.personFirstname !== '' || this.personBirthday !== '') {
      const updatedPerson: Person = new Person();
      updatedPerson.personId = this.persons[this.currentIndex].personId;
      updatedPerson.lastname = this.personLastname !== '' ? this.personLastname : this.persons[this.currentIndex].lastname;
      updatedPerson.firstname = this.personFirstname !== '' ? this.personFirstname : this.persons[this.currentIndex].firstname;
      updatedPerson.birthday = this.personBirthday !== '' ? new Date(this.personBirthday) : this.persons[this.currentIndex].birthday;
      console.log(this.personBirthday);
      console.log(updatedPerson.birthday);
      // this.personService.updatePerson(updatedPerson).then(resp => this.persons[this.currentIndex] = resp);
    }
  }

  private clearData(): void {
    this.currentIndex = -1;
    this.personLastname = '';
    this.personFirstname = '';
    this.personBirthday = '';
    this.isBirthdayFormatValid = true;
  }
}
