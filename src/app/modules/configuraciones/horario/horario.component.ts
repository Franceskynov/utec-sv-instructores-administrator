import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { HorarioService } from 'app/services/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HorarioComponent implements OnInit {

  public inicio: any;
  public fin: any;
  public meridian: boolean;
  public days: Array<any>;
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
    private service: HorarioService,
  ) { }

  ngOnInit() {
    this.meridian = true;
    this.inicio = {hour: 6, minute: 30};
    this.fin = { hour: 21, minute: 30};
    this.days = [
      { id: 1, nombre: 'Lunes' },
      { id: 2, nombre: 'Martes' },
      { id: 3, nombre: 'Miercoles' },
      { id: 4, nombre: 'Jueves' },
      { id: 5, nombre: 'Viernes' },
      { id: 6, nombre: 'Sabado' },
      { id: 7, nombre: 'Domingo' },

    ];
    this.searchColums = ['nombre_dia', 'inicio', 'fin'];
    this.retrieveData();

    this.ctrls = ['dia', 'inicio', 'fin'];
    this.permissions = {
      dia: {
        required: true
      },
      inicio: {
        required: true,
      },
      fin: {
        required: true,
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  get f() { return this.frm.controls; }
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
      dia:          this.f.dia.value.id,
      nombre_dia:   this.f.dia.value.nombre,
      inicio:       this.mapTime(this.f.inicio.value),
      fin:          this.mapTime(this.f.fin.value)
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

  public mapTime(row): string {
    return row.hour.toString().concat(':').concat(row.minute);
  }
  public patchData(): void {
    const frmData = {
      dia:          this.f.dia.value.id,
      nombre_dia:   this.f.dia.value.nombre,
      inicio:       this.mapTime(this.f.inicio.value),
      fin:          this.mapTime(this.f.fin.value)
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
    this.modalService.open(content);
    if (this.editMode) {
      this.f.dia.patchValue(row.nombre_dia);
      this.f.inicio.patchValue(row.inicio);
      this.f.fin.patchValue(row.fin);
    } else {
      this.frm.reset();
      this.meridian = true;
      this.inicio = {hour: 6, minute: 30};
      this.fin = { hour: 21, minute: 30};
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

}
