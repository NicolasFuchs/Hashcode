import {Role} from './Role';

export class Account {
  accountId: number;
  firstname: string;
  lastname: string;
  email: string;
  pseudo: string;
  password: string;
  image: string;
  role: Role;

  constructor() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.pseudo = '';
    this.password = '';
  }
}
