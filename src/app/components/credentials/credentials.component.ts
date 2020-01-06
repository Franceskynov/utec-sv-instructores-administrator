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
  public frmEm: FormGroup;
  public ctrls: Array<String>;
  public ctrlsEm: Array<String>;
  public permissions: any;
  public permissionsEm: any;
  constructor(
    private permissionsService: PermissionsService,
    private decodeToken: DecodeTokenService,
    private credentialService: CredentialService,
    private toaster: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ctrls = ['email', 'oldPassword', 'password', 'confirmPassword'];
    this.ctrlsEm = ['email', 'emailAccount', 'username'];
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
    this.permissionsEm = {
      email: {
        required: true,
        email: true
     },
      emailAccount: {
        // required: true,
        email: true
      },
      username: {
        required: true,
        minLength: 6,
        maxLength: 75
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.frmEm = this.permissionsService.findPermission(this.ctrlsEm, this.permissionsEm);
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
    this.fEm.email.setValue(this.token.email);
    this.fEm.username.setValue(this.token.username);
  }

  get f() { return this.frm.controls; }
  get fEm() { return this.frmEm.controls; }
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

  public changeEmailOrUserName(): void {
    const formData = {
      email: this.token.email,
      newEmail: this.fEm.emailAccount.value,
      username: this.fEm.username.value,
      userId: this.token.userId
    };
    this.credentialService.updateEmailOrUserName(formData).subscribe(response => {
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
    });
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }
}
