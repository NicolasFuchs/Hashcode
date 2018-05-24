import {Solution} from './Solution';
import {Account} from './Account';

export class Team {
  teamId: number;
  name: string;
  solutions: Solution[];
  members: Account[];

  constructor(name: string, members: Account[]) {
    this.solutions = [];
    this.members = [];
  }
}
