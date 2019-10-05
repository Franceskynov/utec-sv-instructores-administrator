import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AulaService } from 'app/services/aula.service';
import { EdificioService } from 'app/services/edificio.service';

@Component({
  selector: 'app-instructoria',
  templateUrl: './instructoria.component.html',
  styleUrls: ['./instructoria.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructoriaComponent implements OnInit {

  public edificios: Array<any>;
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
    private service: AulaService,
    private edificioService: EdificioService,
  ) { }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.edificios = [];
    this.searchColums = ['nombre', 'descripcion'];
    this.ctrls = ['edificio', 'codigo', 'capacidad'];
    this.permissions = {
      edificio: {
        required: true
      },
      codigo: {
        required: true
      },
      capacidad: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.retrieveData();
  }

  get f () { return  this.frm.controls; }
  public retrieveData(): void {
    this.service.retrieve().subscribe(response => {
      const tmp = response.data;
      this.rows = tmp.filter(row =>  row.is_enabled === '1');
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public postData(): void {
    const frmData = {
      codigo: this.f.codigo.value,
      capacidad: parseInt(this.f.capacidad.value, 10),
      edificio_id: this.f.edificio.value.id,
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
      codigo: this.f.codigo.value,
      capacidad: parseInt(this.f.capacidad.value, 10),
      edificio_id: this.f.edificio.value.id,
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

    console.log(frmData);
  }

  public openModal(content, row): void {
    this.modalService.open(content);
    if (this.editMode) {
      this.idForEdit = row.id;
      this.f.edificio.setValue(row.edificio.nombre);
      this.f.codigo.setValue(row.codigo);
      this.f.capacidad.setValue(row.capacidad);
    }
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public preparaForDelete(content, row) {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
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
