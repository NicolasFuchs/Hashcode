import {Role} from './Role';
import {Team} from './Team';

export class Account {
  accountId: number;
  firstname: string;
  lastname: string;
  email: string;
  pseudo: string;
  password: string;
  image: string;
  role: Role;
  teams: Team[];

  constructor() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.pseudo = '';
    this.password = '';
  }
}
