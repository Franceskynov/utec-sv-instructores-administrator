import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public decode: any;
  public userName: string;
  constructor(
    private decodeToken: DecodeTokenService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userName = '';
    this.decode = {
      username: null
    };
    this.getPayloadData();
  }

  public getPayloadData(): void {
    this.decode = this.decodeToken.decodePayload();
    this.userName = this.decode.username;
  }

  public logOut(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

}
