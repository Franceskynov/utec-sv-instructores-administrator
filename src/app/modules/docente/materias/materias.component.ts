import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocenteService } from 'app/services/docente.service';
import { MateriasService } from 'app/services/materias.service';
import { PermissionsService } from 'app/services/permissions.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MateriasComponent implements OnInit {

  public token: any;
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
    private materiaService: MateriasService,
    private permissionsService: PermissionsService,
    private decodeTokenService: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.docenteId = 0;
    this.ctrls = ['materia'];
    this.rows = [];
    this.permissions = {
      materia: {
        required: true,
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.retrieveData();
  }

  public retrieveData(): void {
    this.token = this.decodeTokenService.decodePayload();
    this.docenteId = this.token.people.id;
    this.materiaService.retrieve().subscribe( response => { this.materias = response.data; }, error => { this.errorResponse(error); });
    this.docenteService.retrieveById(this.docenteId).subscribe(response => {
      this.rows = response.data.materias;
    }, error => { this.errorResponse(error); });
  }

  public preparaForDelete(content, row): void {
    this.modalService.open(content);
    this.idForDestroy = row.id;
  }

  public deleteData(): void {
    for ( let i = 0; i < this.rows.length; i++) {
      if ( this.rows[i].id === this.idForDestroy) {
        this.rows.splice(i, 1);
      }
    }
    const formData = {
      docenteId: this.docenteId,
      materias: this.mapMaterias(this.rows)
    };
    this.docenteService.removeMateria(this.docenteId, formData).subscribe(response => {
      if (!response.error) {
        this.toaster.success(response.message, environment.MESSAGES.OK);
        this.retrieveData();
      } else {
        this.toaster.warning(response.message, environment.MESSAGES.WARN);
      }
    }, error => { this.errorResponse(error); });
  }

  public postData(): void {
    const materia = this.frm.controls.materia.value;
    if (!this.rows.find(o => o.nombre === materia.nombre )) {
      this.rows.push(materia);
      this.rows = [...this.rows];
      const formData = {
        docenteId: this.docenteId,
        materias: this.mapMaterias(this.rows)
      };
      this.docenteService.addMateria(formData).subscribe(response => {
        if (!response.error) {
          this.toaster.success(response.message, environment.MESSAGES.OK);
          this.retrieveData();
        } else {
          this.toaster.warning(response.message, environment.MESSAGES.WARN);
        }
      }, error => {
        this.errorResponse(error);
      });
    } else {
      this.toaster.warning('La materia ya se encuentra registrada', environment.MESSAGES.WARN);
    }
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  public errorResponse(error): void {
    this.toaster.warning(error.error.message, environment.MESSAGES.WARN);
  }

  public mapMaterias(rows): any {
    return  rows.map((row) => {
      return row.id;
    });
  }

}
