import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  public token: any;
  constructor(
    private decodeTokenService: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.token = {
      iss: null,
      iat: null,
      exp: null,
      nbf: null,
      jti: null,
      sub: null,
      prv: null,
      is_admin: null,
      role: null,
      descrpcn: null,
      username: null,
      email: null,
      people: null
    };

    this.userData();
  }

  public userData(): void {
    this.token = this.decodeTokenService.decodePayload();

    // console.log(this.token);
  }

}
