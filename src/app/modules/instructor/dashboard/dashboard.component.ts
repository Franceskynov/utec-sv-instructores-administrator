import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public token: any;
  constructor(
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.token = {};
    this.token = this.decodeToken.decodePayload();
  }

}
