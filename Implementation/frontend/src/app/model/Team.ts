import {Solution} from './Solution';
import {Account} from './Account';
import {Challenge} from './Challenge';

export class Team {
  teamId: number;
  name: string;
  challenge: Challenge;
  solutions: Solution[];
  leader: Account;
  members: Account[];

  constructor(name: string, challenge: Challenge, leader: Account, members: Account[]) {
    this.name = name;
    this.challenge = challenge;
    this.leader = leader;
    this.members = members;
    this.solutions = [];
  }
}
