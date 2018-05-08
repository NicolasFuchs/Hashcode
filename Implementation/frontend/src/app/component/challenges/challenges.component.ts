import {Component} from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {

  public time: string;

  constructor() {
    this.time = 'actual';
  }
}
