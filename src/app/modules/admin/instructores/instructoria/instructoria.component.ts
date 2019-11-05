import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AulaService } from 'app/services/aula.service';
import { EdificioService } from 'app/services/edificio.service';
import { CicloService } from 'app/services/ciclo.service';
import { HorarioService } from 'app/services/horario.service';
import { MateriasService } from 'app/services/materias.service';
import { AsignacionService } from 'app/services/asignacion.service';
import { DocenteService } from 'app/services/docente.service';

@Component({
  selector: 'app-instructoria',
  templateUrl: './instructoria.component.html',
  styleUrls: ['./instructoria.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructoriaComponent implements OnInit {

  public filtered: any;
  public docentes: Array<any>;
  public ciclos: Array<any>;
  public horarios: Array<any>;
  public aulas: Array<any>;
  public materias: Array<any>;
  public edificios: Array<any>;
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
  public inicio: any;
  public fin: any;
  public meridian: boolean;
  public days: Array<any>;
  public day: number;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: AsignacionService,
    private edificioService: EdificioService,
    private cicloService: CicloService,
    private horarioService: HorarioService,
    private aulaService: AulaService,
    private materiasService: MateriasService,
    private asignacionService: AsignacionService,
    private docenteService: DocenteService,
  ) { }

  ngOnInit() {
    this.filtered = [];
    this.editMode = false;
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.edificios = [];
    this.row = {};
    this.searchColums = ['nombre', 'carrera', 'cum', 'docente'];
    this.ctrls = ['nombre', 'ciclo', 'aula', 'materia', 'docente', 'dia', 'inicio', 'fin'];
    this.permissions = {
      nombre: {
        required: true,
        minLength: 5
      },
      ciclo: {
        required: true
      },
      aula: {
        required: true
      },
      materia: {
        required: true
      },
      docente: {
        required: true
      },
      dia: {
        required: true
      },
      inicio: {
        required: true,
      },
      fin: {
        required: true,
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.retrieveData();
    this.retrieve();
    this.meridian = true;
    this.day = 0;
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

  public retrieve(): void {
    this.cicloService.retrieve().subscribe(response => { this.ciclos = response.data; }, error => { this.errorResponse(); });
    this.horarioService.retrieve().subscribe(response => { this.horarios = response.data; }, error => { this.errorResponse(); });
    this.aulaService.retrieve().subscribe(response => { this.aulas = response.data; }, error => { this.errorResponse(); });
    this.materiasService.retrieve().subscribe(response => { this.materias = response.data; }, error => { this.errorResponse(); });
    this.docenteService.retrieve({ noPaginate: true}).subscribe(response => { this.docentes = response.data; }, error => { this.errorResponse(); });
  }

  public postData(): void {}

  public patchData(fn): void {
    const formData = {
      nombre: this.f.nombre.value,
      ciclo_id: this.f.ciclo.value.id,
      aula_id: this.f.aula.value.id,
      instructor_id: Number(this.row.instructor_id),
      materia_id: this.f.materia.value.id,
      docente_id: this.f.docente.value.id,
      dia:          this.day,
      nombre_dia:   this.f.dia.value,
      inicio:       this.mapTime(this.f.inicio.value),
      fin:          this.mapTime(this.f.fin.value),
    };
    this.asignacionService.modify(this.idForEdit, formData).subscribe(response => {
      console.log('response', response);
      if (!response.error) {
        fn();
        this.retrieveData();
      }
    }, error => {
      this.errorResponse();
    });
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    this.idForEdit = row.id;
    this.row = row;
    if (this.editMode) {
      this.f.nombre.setValue(row.nombre);
      this.f.ciclo.setValue(row.ciclo);
      this.f.aula.setValue(row.aula);
      this.f.materia.setValue(row.materia);
      this.f.docente.setValue(row.docente);
      this.f.ciclo.patchValue(row.ciclo);
      this.f.dia.patchValue(row.nombre_dia);
      this.inicio = this.decomposeTime(row.inicio);
      this.fin = this.decomposeTime(row.fin);
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
    this.asignacionService.destroy(this.idForDestroy).subscribe(
      data => {
        this.toastr.success(environment.MESSAGES.DELETION_OK, 'Ok');
        this.retrieveData();
      },
      error => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, 'Error');
      }
    );
  }

  public errorResponse(): void {
    this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
  }

  public filterData(rows): void {
    console.log(rows);
    this.filtered =  rows.filter(row =>  row.pivot.is_used === '0');
  }

  public mapTime(row): string {
    return row.hour.toString().concat(':').concat(row.minute);
  }

  public decomposeTime(time): any {
    return {
      hour: parseInt(time, 10),
      minute: parseInt(time.substring(3, 5), 10)
    };
  }

}
