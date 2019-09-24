import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

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
  ) { }

  ngOnInit() {
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
      console.log(response)
      if (!response.error) {
        this.goTo();
      } else {
        this.toastr.warning('El usuario y la clave no coinciden', 'Login iconrrecto')
      }
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR)
    });
  }

  public goTo(): void {
    this.router.navigate(['/', 'instructores', 'catalogo']);
  }

}
