import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { CredentialService } from 'app/services/credential.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverComponent implements OnInit {

  public email: any;
  public copy: string;
  public emailChecked: boolean;
  public recovered: boolean;
  public checkUserFrm: FormGroup;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private credentialService: CredentialService,
  ) { }

  ngOnInit() {
    this.copy = environment.copy;
    this.emailChecked = false;
    this.recovered = false;
    this.copy = environment.copy;
    this.checkUserFrm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  public recoverCredentials(): void {
    this.email = {
      email: this.checkUserFrm.controls.email.value
    };
    this.credentialService.check(this.email).subscribe(response => {
      if (!response.error) {
        this.emailChecked = true;
        this.credentialService.recover(this.email).subscribe(subresponse => {
          if (!subresponse.error) {
            this.recovered = true;
            setTimeout(() => {
              this.router.navigate(['/', 'login']);
            }, 1 * 1000);
          } else {
            this.errorResponse(subresponse.message);
          }
        }, error => {
          this.errorResponse(error);
        });
      } else {
        this.emailChecked = false;
      }
    }, error => {
      this.errorResponse(error);
    });
  }

  public errorResponse(error): void {
    this.toastr.warning(error.error.message, environment.MESSAGES.ERROR);
  }

}
