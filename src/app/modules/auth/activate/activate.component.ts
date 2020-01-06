import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { CredentialService } from 'app/services/credential.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivateComponent implements OnInit {

  public existEmailForActivate: boolean;
  public emailForActivate: string;
  public email: string;
  public copy: string;
  public emailChecked: boolean;
  public activateUserFrm: FormGroup;
  public checkUserFrm: FormGroup;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private credentialService: CredentialService,
  ) { }

  ngOnInit() {
    this.existEmailForActivate = false;
    this.emailChecked = false;
    this.copy = environment.copy;
    this.checkUserFrm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
    this.activateUserFrm = new FormGroup({
      email: new FormControl({ disabled: true, value: '' }, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
    this.emailForActivate = localStorage.getItem('emailForActivate');
    this.checkifActivate();
  }

  public checkifActivate(): void {
    if (this.emailForActivate) {
      this.existEmailForActivate = true;
      this.checkUserFrm.controls.email.disable();
      this.checkUserFrm.controls.email.patchValue(this.emailForActivate);
    } else {
      this.existEmailForActivate = false;
    }
  }

  public checkUserByEmail(): void {
    this.email = this.checkUserFrm.controls.email.value;
    this.credentialService.check({email: this.email}).subscribe(response => {
      if (!response.error) {
        if (response.data.is_activated) {
          this.emailChecked = true;
          this.activateUserFrm.controls.email.patchValue(this.email);
        } else {
          this.toastr.warning('El ', environment.MESSAGES.WARN);
        }
      } else {
        this.emailChecked = false;
      }
    }, error => {
      this.toastr.warning(error.error.message, environment.MESSAGES.ERROR);
    });
  }

  public activateUser(): void {
    const frmData = {
      email: this.email,
      password: this.activateUserFrm.controls.password.value
    };
    this.credentialService.activate(frmData).subscribe(response => {
      if (!response.error) {
        // localStorage.removeItem('emailForActivate');
        this.toastr.success(response.message, environment.MESSAGES.OK);
        setTimeout(() => {
          this.router.navigate(['/', 'login']);
        }, 1 * 1000);
      }
    }, error => {
      this.toastr.warning(error.error.message, environment.MESSAGES.ERROR);
    });
  }


}
