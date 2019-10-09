import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { MateriasService } from 'app/services/materias.service';
import { ExpedienteService } from 'app/services/expediente.service';
import { InstructorService } from 'app/services/instructor.service';
import { InstructorSharingService } from 'app/services/instructor-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogoComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public instructores: Array<any>;
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
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private materiaService: MateriasService,
    private expedienteService: ExpedienteService,
    private service: InstructorService,
    private instructorSharingService: InstructorSharingService,
    ) { }

  ngOnInit() {
    this.instructores = [];
    this.frm = new FormGroup({
      nombre: new FormControl({value: '', disabled: true}, Validators.required),
      carnet: new FormControl({value: '', disabled: false}, Validators.required),
      carrera: new FormControl({value: '', disabled: true}, Validators.required),
      cum: new FormControl({value: '', disabled: true}, Validators.required),
      phone: new FormControl({value: '', disabled: false}, Validators.required),
      personalEmail: new FormControl({value: '', disabled: false}, [ Validators.required, Validators.email])
    });
    this.searchColums = ['nombre', 'descripcion'];
    this.retrieve();
    this.subscription = this.instructorSharingService.getStatus().subscribe(result => {
      this.changeStatusElement(
        this.identifyElement(result)
      );
    });
  }

  public get f() { return this.frm.controls; }

  public retrieve(): void {
    this.service.retrieve().subscribe(response => {
      console.log(response);
      this.instructores = response.data;
    }, error => {
      this.toastr.error('No se pudo conectar a el servidor', 'Error');
    });
  }
  public retrieceExpediente(): void {
    this.expedienteService.retrieve({carnet: this.f.carnet.value}).subscribe( response => {
      console.log(response);
      this.row = response.data;
      this.f.nombre.setValue(this.row.nombre);
      this.f.carrera.setValue(this.row.carrera);
      this.f.cum.setValue(this.row.cum);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }
  public retrieveData(): void {}
  public postData(): void {
    const carnet = this.f.carnet.value;
    const pEmail = this.f.personalEmail.value;
    const frmData = {

      nombre: this.f.nombre.value,
      carnet: carnet,
      carrera: this.f.carrera.value,
      cum: this.f.cum.value,
      telefono: this.f.phone.value,
      email: carnet.concat('@mail.utec.edu.sv'),
      emailPersonal: pEmail,
      username: pEmail.split('@')[0],
      notas: this.trimmingNotas(this.row.notas)
    };
    this.service.make(frmData).subscribe(result => {
      console.log(result);
      if (!result.error) {
        this.retrieve();
        this.frm.reset();
        this.toastr.success(environment.MESSAGES.MODIFIED_OK, 'Ok');
      } else {
        this.toastr.error('No se pudo procesar', 'Error');
      }
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
    // console.log(frmData);
    // console.log('notas', this.row.notas);
  }
  public patchData(): void {}

  goPlaces() {
    this.router.navigate(['/', 'admin', 'instructores', 'perfil', 1]);
  }

  public openModal(content, row): void {
    this.modalService.open(content);
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public selectForAssign(row): void {
    this.instructorSharingService.setInstructor(row);
    this.changeStatusElement(
      this.identifyElement(row)
    );
  }

  public identifyElement(row): number {
    return  this.instructores.indexOf(row);
  }

  public changeStatusElement(index): void {
    this.instructores[index].is_selected =  (this.instructores[index].is_selected === '0') ? '1' : '0';
  }

  public trimWhiteSpaces(str): string {
    return str.replace(/[ \t][ \t]+/, '');
  }

  public trimmingNotas(data): any {
   return  data.map((row) => {
      return {
        mat_codigo: this.trimWhiteSpaces(row.mat_codigo),
        mat_nombre: this.trimWhiteSpaces(row.mat_nombre),
        estado: row.estado,
        nota: row.nota,
        ciclo: row.ciclo
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
