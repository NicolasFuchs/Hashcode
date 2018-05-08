import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.css']
})
export class ChallengeDetailsComponent implements OnInit {

  // @Input() public time: string;

  public constructor() {
  }

  public ngOnInit(): void {
    // this.time = 'actual';
  }
}
