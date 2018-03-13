export class Person {
  personId: number;
  firstname: string;
  lastname: string;

  constructor(lastname: string, firstname: string) {
    this.lastname = lastname;
    this.firstname = firstname;
  }
}
