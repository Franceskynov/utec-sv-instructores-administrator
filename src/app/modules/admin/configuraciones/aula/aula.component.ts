import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AulaService } from 'app/services/aula.service';
import { EdificioService } from 'app/services/edificio.service';
import { HorarioService } from 'app/services/horario.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { CicloService } from 'app/services/ciclo.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AulaComponent implements OnInit {

  public filteredHorarios: Array<any>;
  public ciclos: Array<any>;
  public token: any;
  public edificios: Array<any>;
  public horarios: Array<any>;
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
    private horarioService: HorarioService,
    private decodeToken: DecodeTokenService,
    private cicloService: CicloService,
  ) { }

  ngOnInit() {
    this.token = this.decodeToken.decodePayload();
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.edificios = [];
    this.filteredHorarios = [];
    this.searchColums = ['nombre', 'descripcion'];
    this.ctrls = ['edificio', 'codigo', 'capacidad', 'horarios', 'ciclo'];
    this.permissions = {
      edificio: {
        required: true
      },
      codigo: {
        required: true
      },
      capacidad: {
        required: true
      },
      horarios: {
        required: true
      },
      ciclo: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.f.ciclo.patchValue(this.token.people.settings.ciclo);
    this.retrieveData();
    this.retrieveEdificios();
    this.retrieveHorarios();
  }

  get f () { return  this.frm.controls; }
  public retrieveEdificios(): void {
    this.edificioService.retrieve().subscribe(response => {
     this.edificios = response.data;
     console.log('edificios', response);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }
  public retrieveHorarios(): void {
    this.horarioService.retrieve().subscribe(response => {
      this.horarios = response.data;
      this.filterByCiclo();
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }
  public retrieveData(): void {
    this.service.retrieve().subscribe(response => {
      const tmp = response.data;
      this.rows = tmp.filter(row =>  row.is_enabled === '1');
      console.log('response', this.rows);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
    this.cicloService.retrieve().subscribe(response => {
      this.ciclos = response.data;
      }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public postData(): void {
    const frmData = {
      codigo: this.f.codigo.value,
      capacidad: parseInt(this.f.capacidad.value, 10),
      edificio_id: this.f.edificio.value.id,
      horarios: this.mapHorarios(this.f.horarios.value)
    };
    this.service.make(frmData).subscribe(data => {
        if (!data.error) {
          this.toastr.info(environment.MESSAGES.CREATED_OK, 'Ok');
          this.frm.reset();
          this.retrieveData();
        } else {
          this.toastr.warning(data.message, environment.MESSAGES.WARN);
        }
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
      horarios: this.mapHorarios(this.f.horarios.value)
    };
    this.service.modify(this.idForEdit, frmData).subscribe(data => {
        if (!data.error) {
          this.retrieveData();
          this.frm.reset();
          this.toastr.success(environment.MESSAGES.MODIFIED_OK, 'Ok');
        } else {
          this.toastr.warning(data.message, environment.MESSAGES.WARN);
        }
      },
      error => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
      });

    console.log(frmData);
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
    if (this.editMode) {
      this.idForEdit = row.id;
      this.f.edificio.setValue(row.edificio);
      this.f.codigo.setValue(row.codigo);
      this.f.capacidad.setValue(row.capacidad);
      this.f.horarios.setValue(row.horarios);
      this.f.ciclo.setValue(row.horarios[0].ciclo);
      console.log(row);
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

  public mapHorarios(horarios): Array<any> {
    return horarios.map((row) => {
      return row.id;
    });
  }

  public filterByCiclo() {
    this.frm.controls.horarios.reset();
    this.filteredHorarios = [];
    this.filteredHorarios = this.horarios.filter(row =>  row.ciclo.nombre === this.frm.controls.ciclo.value.nombre);
  }

}
