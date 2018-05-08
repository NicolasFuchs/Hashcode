import {Team} from './Team';

export class Challenge {
  challengeId: number;
  name: string;
  nbTeams: number;
  inscriptionDate: Date;
  begin: Date;
  end: Date;
  mediaXml: string;
  organizers: Account[];
  participants: Team[];
}
