import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocenteService } from 'app/services/docente.service';
import { PermissionsService } from 'app/services/permissions.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { AsignacionService } from 'app/services/asignacion.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { FormGroup } from '@angular/forms';
import {not} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-instructoria',
  templateUrl: './instructoria.component.html',
  styleUrls: ['./instructoria.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructoriaComponent implements OnInit {

  public instructorData: any;
  public token: any;
  public limit: Number;
  public row: any;
  public docenteId: any;
  public idForDestroy: any;
  public rows: Array<any>;
  public materias: Array<any>;
  public editMode: boolean;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  constructor(
    private docenteService: DocenteService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private permissionsService: PermissionsService,
    private decodeTokenService: DecodeTokenService,
    private asignacionService: AsignacionService
  ) { }

  ngOnInit() {
    this.row = {
      instructoria: [
        {
          id: null,
          ciclo: {
            nombre: null
          },
          horario: {
            nombre_dia: null,
            inicio: null,
            fin: null
          },
          materia: {
            nombre: null
          },
          aula: {
            codigo: null,
            capacidad: null
          },
          docente: {
            nombre: null,
            apellido: null
          },
          instructor: {
            id: null,
            nombre: null,
            apellido: null
          }
        }
      ]
    };
    this.retrieveData();
    this.ctrls = ['nota', 'comentarios'];
    this.rows = [];
    this.permissions = {
      nota: {
        required: true,
      },
      comentarios: {
        required: true,
        minLength: 5
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  public retrieveData(): void {
    this.token = this.decodeTokenService.decodePayload();
    this.docenteId = this.token.people.id;
    this.docenteService.retrieveById(this.docenteId).subscribe(response => {
      this.row.instructoria = response.data.instructorias;
      console.log(response.data.instructorias);
    }, error => { this.errorResponse(error); });
  }

  public errorResponse(error): void {
    this.toaster.warning(error.error.message, environment.MESSAGES.WARN);
  }

  get f() { return this.frm.controls; }
  public postData(fn): void {
    const nota = Number(this.f.nota.value);
    const formData = {
      nota: nota,
      comentarios: this.f.comentarios.value,
      instructorId: this.instructorData.instructor.id
    };
    console.log(formData, this.docenteId);
    if (this.validateScore(nota)) {
      this.asignacionService.removeAsignation(this.docenteId, formData).subscribe(response =>  {
        if (!response.error ) {
          this.toaster.success(response.message, environment.MESSAGES.OK);
          fn();
          this.frm.reset();
          this.retrieveData();
        } else {
          this.toaster.warning(response.message, environment.MESSAGES.WARN);
        }
      }, error => {
        this.errorResponse(error);
      });
    } else {
      this.toaster.warning(environment.MESSAGES.INVALID_SCORE, environment.MESSAGES.WARN);
    }
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
    this.instructorData = row;
  }

  public validateScore(score): boolean {
    return score <= 10 && score > 0;
  }
}
