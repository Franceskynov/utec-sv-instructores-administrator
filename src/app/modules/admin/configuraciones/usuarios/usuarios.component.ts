import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { UsuarioService } from 'app/services/usuario.service';
import { SharedService } from 'app/services/shared.service';
import { Subscription } from 'rxjs';
import { RoleService } from 'app/services/role.service';
import { CoordinatorsService } from 'app/services/coordinators.service';
import { SettingService } from 'app/services/setting.service';
import { AdministratorService } from 'app/services/administrator.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {

  private subscription: Subscription;
  public filterValue: string;
  public rows: Array<any>;
  public roles: Array<any>;
  public limit: Number;
  public editMode: boolean;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  public data: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: UsuarioService,
    private sharedService: SharedService,
    private roleService: RoleService,
    private coordinatorsService: CoordinatorsService,
    private settingService: SettingService,
    private administratorService: AdministratorService
  ) {

    const thisComponent = this;
    this.subscription = this.sharedService.getFixWidthTable().subscribe(
      () => {
        setInterval(() => {
          thisComponent.rows = [...thisComponent.rows];
        }, 1500);
      });
  }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.retrieveData();
    this.initForm();
    this.data = {
      docente_email_prefix: null
    };
  }

  get f() { return this.frm.controls; }
  public initForm(): void {
    this.ctrls = ['name', 'lastname', 'email', 'phone', 'office', 'role'];
    this.permissions = {
      name: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      lastname: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      email: {
        // email: true,
        required: true,
        minLength: 5,
        maxLength: 50
      },
      phone: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      office: {
        required: true,
      },
      role: {
        required: true,
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.f.role.patchValue({
      nombre: 'Coordinador'
    });
  }

  public retrieveData(): void {
    this.service.retrieve().subscribe(result => {
      if (!result.error) {
        console.log(result.data);
        this.rows = result.data;
      }
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
    this.roleService.retrieve().subscribe(result => {
      if (!result.error) {
        this.roles = result.data;
      }
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });

    this.settingService.retrieve().subscribe(response => {
      this.data = response.data;
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
    if (this.editMode) {}
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public postData(fn): void {
    const email = this.f.email.value.concat(this.data.docente_email_prefix);
    const data = {
      nombre: this.f.name.value,
      apellido: this.f.lastname.value,
      email: email,
      telefono: this.f.phone.value,
      oficina: this.f.office.value,
    };
    console.log(data);
    const role = this.f.role.value.nombre;
    if (role === 'Coordinador') {
      this.makeCoordinator(data, fn);
    } else if (role === 'Administrador') {
      this.makeAdministrator(data, fn);
    } else {
      this.toastr.warning('No esta habilitada la creacion de usuarios con otros roles', environment.MESSAGES.WARN);
    }
  }

  public makeCoordinator(frmData, fn): void {
    this.coordinatorsService.make(frmData).subscribe( result => {
      if (!result.error) {
        fn();
        this.retrieveData();
        this.frm.reset();
        this.initForm();
      }
    }, () => {});
  }

  public makeAdministrator(frmData, fn): void {
    this.administratorService.make(frmData).subscribe( result => {
      if (!result.error) {
        fn();
        this.retrieveData();
        this.frm.reset();
        this.initForm();
      }
    }, () => {});
  }

  public patchData(): void {}

}
