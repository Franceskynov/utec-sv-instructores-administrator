import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { PermissionsService } from 'app/services/permissions.service';
import { CicloService } from 'app/services/ciclo.service';
import { HorarioService } from 'app/services/horario.service';
import { AulaService } from 'app/services/aula.service';
import { MateriasService } from 'app/services/materias.service';
import { AsignacionService } from 'app/services/asignacion.service';
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
    private asignacionService: AsignacionService
  ) { }

  ngOnInit() {
    this.row = {};
    this.searchColums = ['nombre', 'carrera', 'cum'];
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.ctrls = ['nombre', 'ciclo', 'horario', 'aula', 'materia'];
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
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
    this.row = row;
    this.f.nombre.setValue(
      this.makeAssignationName(row)
    );
  }

  public loadFromStorage(): void {
    if (localStorage.getItem('instructores')) {
      this.rows = JSON.parse(
        localStorage.getItem('instructores')
      );
    } else {
      this.rows = [];
      this.router.navigate(['/admin/instructores/catalogo']);
    }
  }

  public postData(fn): void {
    const formData = {
      nombre: this.f.nombre.value,
      ciclo_id: this.f.ciclo.value.id,
      horario_id: this.f.horario.value.id,
      aula_id: this.f.aula.value.id,
      instructor_id: this.row.id,
      materia_id: this.f.materia.value.id
    };
    this.asignacionService.make(formData).subscribe(response => {
      console.log('response', response);
      if (response.error) {
        fn();
      }
    }, error => {
      this.errorResponse();
    });
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
    const last = name[3];
    const carnet = row.carnet;
    const uuidstring =  uuid.v4().split('-');
    return `${last}-${first}-${carnet}-${uuidstring[0]}`;
  }

}
