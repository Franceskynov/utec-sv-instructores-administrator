import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { PermissionsService } from 'app/services/permissions.service';
import { CicloService } from 'app/services/ciclo.service';
import { HorarioService } from 'app/services/horario.service';
import { AulaService } from 'app/services/aula.service';
import { MateriasService } from 'app/services/materias.service';
import { AsignacionService } from 'app/services/asignacion.service';
import { DocenteService } from 'app/services/docente.service';
import { InstructorService } from 'app/services/instructor.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AsignacionComponent implements OnInit {

  public filteredHorarios: Array<any>;
  public token: any;
  public ref: any;
  public idForDestroy: any;
  public searchColumns: Array<any>;
  public searchBox: any;
  public filtered: any;
  public instructor: any;
  public instructorId: number;
  public docentes: Array<any>;
  public ciclos: Array<any>;
  public horarios: Array<any>;
  public aulas: Array<any>;
  public materias: Array<any>;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  public limit: Number;
  public rows: Array<any>;
  public row: any;
  public searchColums: Array<String>;
  public filterValue: any;
  public inicio: any;
  public fin: any;
  public meridian: boolean;
  public days: Array<any>;
  public day: number;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private toaster: ToastrService,
    private permissionsService: PermissionsService,
    private cicloService: CicloService,
    private horarioService: HorarioService,
    private aulaService: AulaService,
    private materiasService: MateriasService,
    private asignacionService: AsignacionService,
    private docenteService: DocenteService,
    private instructorService: InstructorService,
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.token = this.decodeToken.decodePayload();
    this.instructorId = 0;
    this.row = {};
    this.instructor = {
      notas: []
    };
    this.initForm();
    this.loadFromStorage();
    this.retrieve();
  }

  public initForm(): void {
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
    this.searchColumns = ['mat_codigo', 'mat_nombre', 'nota', 'estado'];
    this.limit = environment.MAX_ROWS_PER_PAGE;
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
    this.f.ciclo.patchValue(this.token.people.settings.ciclo);
    this.f.nombre.disable();
  }
  get f() { return this.frm.controls; }
  public retrieve(): void {
    this.cicloService.retrieve().subscribe(response => { this.ciclos = response.data; }, error => { this.errorResponse(); });
    this.horarioService.retrieve().subscribe(response => { this.horarios = response.data; }, error => { this.errorResponse(); });
    this.aulaService.retrieve().subscribe(response => { this.aulas = response.data; }, error => { this.errorResponse(); });
    this.materiasService.retrieve().subscribe(response => { this.materias = response.data; }, error => { this.errorResponse(); });
    this.docenteService.retrieve({ noPaginate: true}).subscribe(response => { this.docentes = response.data; }, error => { this.errorResponse(); });
  }

  public retrieveInstructorData(id): void {
    this.instructorService.retrieveById(id).subscribe(response => {
      this.instructor = response.data;
      console.log('instructor', response);
      }, error => {
      this.errorResponse();
    });
  }

  public openModal(content, row, ref?): void {
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    this.row = row;
    this.idForDestroy = row.id;
    this.f.nombre.setValue(
      this.makeAssignationName(row)
    );
    this.retrieveInstructorData(row.id);
    if (ref) {
      this.ref = ref;
    }
  }

  public loadFromStorage(): void {
    if (localStorage.getItem('instructores')) {
      this.rows = JSON.parse(
        localStorage.getItem('instructores')
      );
      if (this.rows.length === 0) {
        setTimeout(() => {
          this.toaster.info('No hay mas instructores por asignar', environment.MESSAGES.OK);
          this.router.navigate(['/admin/instructores/instructoria']);
        }, 3000);
      }
    } else {
      this.rows = [];
      this.router.navigate(['/admin/instructores/catalogo']);
    }
  }

  public removeElement(): void {
    for ( let i = 0; i < this.rows.length; i++) {
      if ( this.rows[i].id === this.idForDestroy) {
        this.rows.splice(i, 1);
      }
    }
  }

  public postData(fn): void {
    const formData = {
      nombre:        this.f.nombre.value,
      ciclo_id:      this.f.ciclo.value.id,
      // horario_id:    this.f.horario.value.id,
      aula_id:       this.f.aula.value.id,
      instructor_id: this.row.id,
      materia_id:    this.f.materia.value.id,
      docente_id :   this.f.docente.value.id,
      dia:           this.day,
      nombre_dia:    this.f.dia.value.nombre,
      inicio:        this.mapTime(this.f.inicio.value),
      fin:           this.mapTime(this.f.fin.value),
    };
    this.asignacionService.make(formData).subscribe(response => {
      console.log('response', response);
      if (!response.error) {
        fn();
        this.frm.reset();
        this.removeElement();
        this.initForm();
        if (this.ref) {
          this.ref();
        }
        localStorage.setItem('instructores', JSON.stringify(this.rows));
        this.loadFromStorage();
        this.toaster.success(environment.MESSAGES.CREATED_OK, environment.MESSAGES.OK);
      } else {
        this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
      }
    }, error => {
      this.errorResponse();
    });
    console.log(formData);
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public errorResponse(): void {
    this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
  }

  public makeAssignationName(row): string {
    const name = row.nombre.toLowerCase().split(' ');
    const first = name[0];
    const last = name[2];
    const carnet = row.carnet;
    const uuidstring =  uuid.v4().split('-');
    return `${last}-${first}-${carnet}-${uuidstring[0]}`;
  }

  public unUsed(rows): Array<any> {
    const tmp = rows;
    console.log(rows);
    return rows; // rows.filter(r => r.pivot.is_used === '0' );
  }

  public filterData(rows): void {
    if ( rows.length !== 0) {
      this.filtered = rows.filter(row =>  row.pivot.is_used === '0');
      console.log(this.row);
    } else  {
      this.filtered = [];
    }
  }

  public validateHorario(): void {
    if (this.f.horario.value.ciclo.nombre !== this.f.ciclo.value.nombre) {
      this.toaster.warning('El ciclo y el horario seleccionados no coinciden', environment.MESSAGES.WARN);
    }
  }

  public mapTime(row): string {
    return row.hour.toString().concat(':').concat(row.minute);
  }

  public evaluateNotas(notas): Array<any> {
    return notas.filter(item => Number(item.nota) >= 8);
  }
}
