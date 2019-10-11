import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { CapacitacionService } from 'app/services/capacitacion.service';
import { DocenteService } from 'app/services/docente.service';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CapacitacionComponent implements OnInit {

  public tipoTraining: Array<any>;
  public docentes: Array<any>;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  public editMode: boolean;
  public limit: Number;
  public rows: Array<any>;
  public idForDestroy: any;
  public idForEdit: any;
  public searchColums: Array<String>;
  public tableValidation: Array<any>;
  public filterValue: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: CapacitacionService,
    private docenteServise: DocenteService,
  ) { }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.ctrls = ['name', 'description', 'docente', 'tipo'];
    this.tipoTraining = [
      { id: 1, nombre: 'Precencial' },
      { id: 2, nombre: 'Virtual' }
    ];
    this.permissions = {
      name: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      description: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      docente: {
        required: true
      },
      tipo: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.searchColums = ['nombre', 'descripcion'];
    this.retrieveData();
  }

  public get f() { return this.frm.controls; }

  public retrieveData(): void {
    this.service.retrieve().subscribe(response => {
      const tmp = response.data;
      this.rows = tmp.filter(row =>  row.is_enabled === '1');
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });

    this.docenteServise.retrieve({
      noPaginate: true
    }).subscribe(response => {
     this.docentes = response.data;
    });
  }

  public postData(): void {
    const frmData = {
      nombre: this.f.name.value,
      descripcion: this.f.description.value,
      docente_id: this.f.docente.value.id,
      tipo: this.f.tipo.value.nombre
    };
    this.service.make(frmData).subscribe(
      data => {
        this.toastr.info(environment.MESSAGES.CREATED_OK, 'Ok');
        this.frm.reset();
        this.retrieveData();
      },
      error => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
      });
  }
  public patchData(): void {
    const frmData = {
      nombre: this.f.name.value,
      descripcion: this.f.description.value,
      docente_id: this.f.docente.value.id,
      tipo: this.f.tipo.value.nombre
    };
    this.service.modify(this.idForEdit, frmData).subscribe(
      data => {
        this.retrieveData();
        this.frm.reset();
        this.toastr.success(environment.MESSAGES.MODIFIED_OK, 'Ok');
      },
      error => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
      });
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
    if (this.editMode) {
      this.idForEdit = row.id;
      this.f.name.patchValue(row.nombre);
      this.f.description.patchValue(row.descripcion);
      this.f.docente.patchValue(row.docente.nombre);
      this.f.tipo.patchValue(row.tipo);
    }
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public preparaForDelete(content, row) {
    this.modalService.open(content);
    this.idForDestroy = row.id;
  }

  public deleteData(): void {
    this.service.destroy(this.idForDestroy).subscribe(
      data => {
        this.toastr.success(environment.MESSAGES.DELETION_OK, 'Ok');
        this.retrieveData();
      },
      error => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, 'Error');
      }
    );
  }

}
