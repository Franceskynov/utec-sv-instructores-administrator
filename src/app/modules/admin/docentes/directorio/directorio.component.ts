import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { EspecialidadService } from 'app/services/especialidad.service';
import { DocenteService } from 'app/services/docente.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DirectorioComponent implements OnInit {

  public docente: any;
  public docentes: Array<any>;
  public especialidades: Array<any>;
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
    private service: DocenteService,
    private especialidadService: EspecialidadService
  ) { }

  ngOnInit() {
    this.docentes = [];
    this.especialidades = [];
    this.docente = {
      nombre: null,
      apellido: null,
      email: null,
      telefono: null,
      oficina: null,
      user_id: null,
      is_enabled: null
    };
    this.retrieveEspecialidadData();
    this.retrieveData();
    this.ctrls = ['name', 'lastname', 'email', 'phone', 'speciality'];
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
        email: true,
        required: true,
        minLength: 5,
        maxLength: 50
      },
      phone: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      speciality: {
        required: true,
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  get f() { return this.frm.controls; }
  public retrieveEspecialidadData(): void {
    this.especialidadService.retrieve().subscribe(response => {
      this.especialidades = response.data;
      console.log(response);
    }, error => {
      this.toastr.error('No se pudo conectar a el servidor', 'Error');
    });
  }

  public retrieveData(): void {
    this.service.retrieve({
      noPaginate: true
    }).subscribe(response => {
      this.docentes = response.data;
      console.log(response);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public postData(): void {
    console.log(
      this.frm.getRawValue()
    );
  }
  public patchData(): void {}

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

}
