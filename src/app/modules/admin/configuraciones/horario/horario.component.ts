import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { HorarioService } from 'app/services/horario.service';
import { CicloService } from 'app/services/ciclo.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { SharedService } from 'app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HorarioComponent implements OnInit {

  private subscription: Subscription;
  public token: any;
  public inicio: any;
  public fin: any;
  public meridian: boolean;
  public days: Array<any>;
  public day: any;
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
  public ciclos: Array<any>;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: HorarioService,
    private cicloService: CicloService,
    private decodeToken: DecodeTokenService,
    private fb: FormBuilder,
    private sharedService: SharedService,
  ) {
    const thisComponent = this;
    this.subscription = this.sharedService.getFixWidthTable().subscribe(
      result => {
        setInterval((e) => {
          thisComponent.rows = [...thisComponent.rows];
        }, 450);
      });
  }

  ngOnInit() {
    this.token = this.decodeToken.decodePayload();
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.meridian = true;
    this.day = '';
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
    console.log('token', this.token);
    this.ctrls = ['dia', 'inicio', 'fin', 'ciclo'];
    this.permissions = {
      dia: {
        required: true
      },
      inicio: {
        required: true,
      },
      fin: {
        required: true,
      },
      ciclo: {
        required: true
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  get f() { return this.frm.controls; }
  public retrieveData(): void {
    this.service.retrieve().subscribe(response => {
      const tmp = response.data;
      this.rows = tmp.filter(row =>  row.is_enabled === '1');
    }, error => {
      // this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
      this.toastr.error(error.headers.get('service-description'), 'Error');
    });
    this.cicloService.retrieve().subscribe(response => {
      this.ciclos = response.data;
      }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public postData(): void {
    const frmData = {
      dia:          this.f.dia.value.id,
      nombre_dia:   this.f.dia.value.nombre,
      inicio:       this.mapTime(this.f.inicio.value),
      fin:          this.mapTime(this.f.fin.value),
      ciclo_id:     this.f.ciclo.value.id
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

  public mapTime(row): string {
    return row.hour.toString().concat(':').concat(row.minute);
  }
  public patchData(): void {
    const frmData = {
      dia:          this.day,
      nombre_dia:   this.f.dia.value,
      inicio:       this.mapTime(this.f.inicio.value),
      fin:          this.mapTime(this.f.fin.value),
      ciclo_id:     this.f.ciclo.value.id
    };

    console.log('pathdata', frmData);
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
  }

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
    if (this.editMode) {
      this.idForEdit = row.id;
      this.f.ciclo.patchValue(row.ciclo);
      this.f.dia.patchValue(row.nombre_dia);
      this.inicio = this.decomposeTime(row.inicio);
      this.fin = this.decomposeTime(row.fin);
      this.day = row.dia;
      console.log('inicio', this.decomposeTime(row.inicio));
    } else {
      this.frm.reset();
      this.meridian = true;
      this.inicio = {hour: 6, minute: 30};
      this.fin = { hour: 21, minute: 30};
      this.f.ciclo.patchValue(this.token.people.settings.ciclo);
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

  public decomposeTime(time): any {
    return {
      hour: parseInt(time, 10),
      minute: parseInt(time.substring(3, 5), 10)
    };
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
