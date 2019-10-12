import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { LoginService } from 'app/services/login.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import {ADM_ROUTES, DCNT_ROUTES, INSTR_ROUTES} from 'app/shared/sidebar/sidebar-routes.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public copy: string;
  public token: any;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  public editMode: boolean;
  public limit: Number;
  public rows: Array<any>;
  public row: any;
  public idForDestroy: any;
  public idForEdit: any;
  public searchColums: Array<String>;
  public tableValidation: Array<any>;
  public filterValue: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private loginService: LoginService,
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.copy = environment.copy;
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
      email: null
    };
    this.ctrls = ['email', 'password'];
    this.permissions = {
      email: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      password: {
        required: true,
        minLength: 5,
        maxLength: 50
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  get f() { return this.frm.controls; }
  public authenticate(): void {
    this.loginService.authenticate({
      'email': this.f.email.value,
      'password': this.f.password.value
    }).subscribe(response => {
      console.log(response);
      if (!response.error) {
        localStorage.setItem('token', response.data.token);
        this.goTo();
      } else {
        this.toastr.warning('El usuario y la clave no coinciden', 'Login iconrrecto');
      }
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public goTo(): void {
    this.token = this.decodeToken.decodePayload();
    if (this.token.is_admin === '1' && this.token.role === 'Administrador') {
      this.router.navigate(['/', 'admin']);
    } else if (this.token.is_admin === '0' && this.token.role === 'Docente') {
      this.router.navigate(['/', 'docente']);
    } else {
      this.router.navigate(['/', 'instructor']);
    }
  }

}
