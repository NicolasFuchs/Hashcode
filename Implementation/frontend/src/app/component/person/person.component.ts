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
  @ViewChild('personStreetRef') public personStreetRef: ElementRef;
  @ViewChild('personBuildingRef') public personBuildingRef: ElementRef;
  @ViewChild('personPostalCodeRef') public personPostalCodeRef: ElementRef;
  @ViewChild('personCityRef') public personCityRef: ElementRef;

  @ViewChild('alertMessageRef') public alertMessageRef: ElementRef;

  public personLastname: string;
  public personFirstname: string;
  public personBirthday: string;
  public personStreet: string;
  public personBuilding: string;
  public personPostalCode: string;
  public personCity: string;
  public isBirthdayFormatValid: boolean;

  private currentIndex: number;

  private static stringToDate(dateStr: string): Date {
    const dateParts: string[] = dateStr.split('.');
    return new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]);
  }

  constructor(private personService: PersonService) {
    this.clearData();
  }

  public ngOnInit(): void {
    // this.personService.getPersons().then(resp => this.persons = resp);
  }

  public openModalWithoutInfos(): void {
    this.clearData();
    this.personLastnameRef.nativeElement.value = '';
    this.personFirstnameRef.nativeElement.value = '';
    this.personBirthdayRef.nativeElement.value = '';
    this.personStreetRef.nativeElement.value = '';
    this.personBuildingRef.nativeElement.value = '';
    this.personPostalCodeRef.nativeElement.value = '';
    this.personCityRef.nativeElement.value = '';
    $(this.modalRef.nativeElement).modal();
  }

  public openModalWithInfos(index: number): void {
    this.clearData();
    this.currentIndex = index;
    this.personLastnameRef.nativeElement.value = this.persons[this.currentIndex].lastname;
    this.personFirstnameRef.nativeElement.value = this.persons[this.currentIndex].firstname;
    this.personBirthdayRef.nativeElement.value = this.persons[this.currentIndex].birthday
      .toLocaleDateString().replace(/\//g, '.');
    this.personStreetRef.nativeElement.value =
      this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'street');
    this.personBuildingRef.nativeElement.value =
      this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'building');
    this.personPostalCodeRef.nativeElement.value =
      this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'postalCode');
    this.personCityRef.nativeElement.value =
      this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'city');
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
    if (this.checkFields()) {
      const newPerson: Person = new Person();
      newPerson.lastname = this.personLastname;
      newPerson.firstname = this.personFirstname;
      newPerson.birthday = PersonComponent.stringToDate(this.personBirthday);
      newPerson.addressXML = this.getAddressAsXML();
      this.personService.createPerson(newPerson)
        .then(resp => this.persons.push(resp))
        .catch(() => this.showAlert());
    }
  }

  private updatePerson(): void {
    if (this.checkModifications()) {
      const updatedPerson: Person = new Person();
      updatedPerson.personId = this.persons[this.currentIndex].personId;
      updatedPerson.lastname = this.personLastname !== '' ? this.personLastname : this.persons[this.currentIndex].lastname;
      updatedPerson.firstname = this.personFirstname !== '' ? this.personFirstname : this.persons[this.currentIndex].firstname;
      updatedPerson.birthday = this.personBirthday !== '' ? PersonComponent.stringToDate(this.personBirthday)
        : this.persons[this.currentIndex].birthday;
      updatedPerson.addressXML = this.getAddressAsXML();
      this.personService.updatePerson(updatedPerson)
        .then(resp => this.persons[this.currentIndex] = resp)
        .catch(() => this.showAlert());
    }
  }

  private checkFields(): boolean {
    return this.personLastname !== ''
      && this.personFirstname !== ''
      && this.personBirthday !== ''
      && this.personStreet !== ''
      && this.personBuilding !== ''
      && this.personPostalCode !== ''
      && this.personCity !== '';
  }

  private checkModifications(): boolean {
    return this.personLastname !== ''
      || this.personFirstname !== ''
      || this.personBirthday !== ''
      || this.personStreet !== ''
      || this.personBuilding !== ''
      || this.personPostalCode !== ''
      || this.personCity !== '';
  }

  private getAddressAsXML(): string {
    let address = '<address>';
    address += '<street>';
    address += this.personStreet !== '' ? this.personStreet
      : this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'street');
    address += '</street>';
    address += '<building>';
    address += this.personBuilding !== '' ? this.personBuilding
      : this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'building');
    address += '</building>';
    address += '<postalCode>';
    address += this.personPostalCode !== '' ? this.personPostalCode
      : this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'postalCode');
    address += '</postalCode>';
    address += '<city>';
    address += this.personCity !== '' ? this.personCity
      : this.getValueFromXML(this.persons[this.currentIndex].addressXML, 'city');
    address += '</city>';
    address += '</address>';
    return address;
  }

  private getValueFromXML(xmlStr: string, tag: string): string {
    const parser: DOMParser = new DOMParser();
    const xml: Document = parser.parseFromString(xmlStr, 'text/xml');
    return xml.getElementsByTagName(tag)[0].innerHTML;
  }

  private showAlert(): void {
    this.alertMessageRef.nativeElement.classList.add('alert-show');
    setTimeout(function () {
      this.alertMessageRef.nativeElement.classList.remove('alert-show');
    }.bind(this), 4000);
  }

  private clearData(): void {
    this.currentIndex = -1;
    this.personLastname = '';
    this.personFirstname = '';
    this.personBirthday = '';
    this.personStreet = '';
    this.personBuilding = '';
    this.personPostalCode = '';
    this.personCity = '';
    this.isBirthdayFormatValid = true;
  }
}
