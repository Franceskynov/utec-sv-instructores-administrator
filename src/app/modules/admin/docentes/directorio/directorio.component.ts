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

  public config: any;
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
    this.gotoTop();
    this.config = {
      itemsPerPage: 0,
      currentPage: 0,
      totalItems: 0,
      id: 'directorioDocentes'
    };
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
    this.ctrls = ['name', 'lastname', 'email', 'phone', 'speciality', 'office'];
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
      office: {
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

      this.config = {
        itemsPerPage: 6,
        currentPage: 1,
        totalItems: this.docentes.length,
        id: 'directorioDocentes'
      };
      console.log(response);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public postData(): void {
    const data = {
      nombre: this.f.name.value,
      apellido: this.f.lastname.value ,
      email:  this.f.email.value,
      telefono:  this.f.phone.value,
      oficina: this.f.office.value,
      especialidades: this.mapEspecialidad(this.f.speciality.value)
    };
    this.service.make(data).subscribe(response => {
      this.retrieveData();
      this.frm.reset();
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
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

  public mapEspecialidad(data): Array<any> {
    return data.map((row) => {
      return row.id;
    });
  }

  public pageChanged(event) {
    this.config.currentPage = event;
  }

  public gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
