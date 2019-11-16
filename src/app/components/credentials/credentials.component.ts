import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PermissionsService } from 'app/services/permissions.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { CredentialService } from 'app/services/credential.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CredentialsComponent implements OnInit {

  public token: any;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  constructor(
    private permissionsService: PermissionsService,
    private decodeToken: DecodeTokenService,
    private credentialService: CredentialService,
    private toaster: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ctrls = ['email', 'oldPassword', 'password', 'confirmPassword'];
    this.permissions = {
      email: {
        required: true,
        email: true
      },
      oldPassword: {
        required: true
      },
      password: {
        required: true,
      },
      confirmPassword: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);

    this.token = this.token = {
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

    this.token = this.decodeToken.decodePayload();
    this.f.email.setValue(this.token.email);
  }

  get f() { return this.frm.controls; }
  public changeCredentials(): void {
    const formData = {
      oldPassword: this.f.oldPassword.value,
      password: this.f.password.value,
      email: this.f.email.value
    };

    if ( this.f.password.value === this.f.confirmPassword.value) {
      this.credentialService.update(formData).subscribe(response => {
        if (!response.error) {
          this.toaster.success(response.message, environment.MESSAGES.OK);
          setTimeout(() => {
            this.router.navigate(['/login']);
            localStorage.clear();
          }, 2 * 1000);
        } else {
          this.toaster.warning(response.message, environment.MESSAGES.WARN);
        }
      }, error => {
        this.toaster.error(error.error.message, environment.MESSAGES.ERROR);
        console.log(error);
      });
    } else {
      this.toaster.warning('Las contraseñas no coinciden', environment.MESSAGES.WARN);
    }
  }

}
