import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardsComponent implements OnInit {

  public token: any;
  constructor(
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.token = {};
    this.token = this.decodeToken.decodePayload();
  }

}
