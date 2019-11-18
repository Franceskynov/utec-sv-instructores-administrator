import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { LoginService } from 'app/services/login.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { CredentialService } from 'app/services/credential.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public email: string;
  public emailChecked: boolean;
  public accountChecked: boolean;
  public accountBlocked: boolean;
  public checkUserFrm: FormGroup;
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
  public returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private loginService: LoginService,
    private decodeToken: DecodeTokenService,
    private credentialService: CredentialService,
  ) { }

  ngOnInit() {
    this.emailChecked = false;
    this.accountChecked = true;
    this.accountBlocked = false;
    this.copy = environment.copy;
    this.checkUserFrm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
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
    this.frm.controls.email.disable();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.frm.controls; }
  public authenticate(): void {
    this.loginService.authenticate({
      'email': this.f.email.value,
      'password': this.f.password.value
    }).subscribe(response => {
      // console.log(response);
      if (!response.error) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expires', response.data.expires);
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

    if (this.returnUrl === '/') {
      if (this.token.is_admin === '1' && this.token.role === 'Administrador') {
        this.router.navigate(['/', 'admin']);
      } else if (this.token.is_admin === '0' && this.token.role === 'Docente') {
        this.router.navigate(['/', 'docente', 'dashboard']);
      } else {
        this.router.navigate(['/', 'instructor', 'dashboard']);
      }
    } else {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  public checkUserByEmail(): void {
    this.email = this.checkUserFrm.controls.email.value;
    this.credentialService.check({email: this.email}).subscribe(response => {
      if (!response.error) {
        if (response.data.is_enabled === '1') {
          if (response.data.is_activated === '1') {
            this.emailChecked = true;
            this.accountChecked = true;
            this.frm.controls.email.patchValue(this.email);
          } else {
            this.accountChecked = false;
            setTimeout(() => {
              localStorage.setItem('emailForActivate', this.email);
              this.router.navigate(['/login/activate']);
            }, 2 * 1000);
          }
        } else {
          this.accountBlocked = true;
        }
      } else {
        this.emailChecked = false;
      }
    }, error => {
      this.toastr.warning(error.error.message, environment.MESSAGES.ERROR);
    });
  }

}
