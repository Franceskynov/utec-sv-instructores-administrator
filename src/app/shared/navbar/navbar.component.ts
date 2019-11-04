import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

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
    private loginService: LoginService,
    private toaster: ToastrService,
  ) {}

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
    this.loginService.logout().subscribe(response => {
      this.toaster.info(response.data.message, environment.MESSAGES.SERVICE_OK);
      setTimeout(() => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
      }, 500);
    });
    localStorage.clear();
  }

}
