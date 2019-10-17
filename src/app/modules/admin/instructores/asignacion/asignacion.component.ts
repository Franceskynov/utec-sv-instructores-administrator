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

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AsignacionComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    this.instructorId = 0;
    this.row = {};
    this.instructor = {
      notas: []
    };
    this.searchColumns = ['mat_codigo', 'mat_nombre', 'nota', 'estado'];
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.ctrls = ['nombre', 'ciclo', 'horario', 'aula', 'materia', 'docente'];
    this.permissions = {
      nombre: {
        required: true,
        minLength: 5
      },
      ciclo: {
        required: true
      },
      horario: {
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
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.loadFromStorage();
    this.retrieve();
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
      nombre: this.f.nombre.value,
      ciclo_id: this.f.ciclo.value.id,
      horario_id: this.f.horario.value.id,
      aula_id: this.f.aula.value.id,
      instructor_id: this.row.id,
      materia_id: this.f.materia.value.id,
      docente_id : this.f.docente.value.id
    };
    this.asignacionService.make(formData).subscribe(response => {
      console.log('response', response);
      if (!response.error) {
        fn();
        // this.frm.reset();
        this.removeElement();
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
    } else  {
      this.filtered = [];
    }
  }
}
