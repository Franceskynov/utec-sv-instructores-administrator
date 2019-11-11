import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
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
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogoComponent implements OnInit, OnDestroy {

  public token: any;
  public cumIsValid: boolean;
  public config: any;
  public configScoolarshipped: any;
  public configAssignated: any;
  public searchBox: string;
  public searchBoxForScoolarshipped: string;
  public searchBoxAsignated: string;
  public searchColumns: Array<any>;
  public subscription: Subscription;
  public instructores: Array<any>;
  public instructoresAssignated: Array<any>;
  public instructoresScholarshipped: Array<any>;
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
  public currentPageA: number;
  public currentPageB: number;
  public existInstructor: boolean;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private materiaService: MateriasService,
    private expedienteService: ExpedienteService,
    private service: InstructorService,
    private instructorSharingService: InstructorSharingService,
    private decodeToken: DecodeTokenService,
    ) { }

  ngOnInit() {
    this.row = false;
    this.existInstructor = false;
    this.token = this.decodeToken.decodePayload();
    this.currentPageA = 0;
    this.currentPageB = 0;
    this.cumIsValid = false;
    this.searchBox = '';
    this.instructores = [];
    this.searchColumns = ['nombre', 'carnet', 'carrera', 'cum'];
    this.config = {
      itemsPerPage: this.currentPageA,
      currentPage: 0,
      totalItems: 0,
      id: 'catalogoInstructores'
    };
    this.configScoolarshipped = {
      itemsPerPage: 0,
      currentPage: this.currentPageB,
      totalItems: 0,
      id: 'catalogoInstructoresScoolarshipped'
    };
    this.configAssignated  = {
      itemsPerPage: 0,
      currentPage: this.currentPageB,
      totalItems: 0,
      id: 'catalogoInstructoresAssignated'
    };
    this.initForm();
    this.searchColums = ['nombre', 'descripcion'];
    this.retrieve();
    this.subscription = this.instructorSharingService.getStatus().subscribe(result => {
      this.changeStatusElement(
        this.identifyElement(result)
      );
    });

    // localStorage.setItem('changed', 'false');
    console.log(localStorage);
  }

  public initForm(): void {
    this.frm = new FormGroup({
      nombre: new FormControl({value: '', disabled: true}, Validators.required),
      carnet: new FormControl({value: '', disabled: false}, Validators.required),
      carrera: new FormControl({value: '', disabled: true}, Validators.required),
      cum: new FormControl({value: '', disabled: true}, Validators.required),
      phone: new FormControl({value: '', disabled: false}, ),
      personalEmail: new FormControl({value: '', disabled: false}, [  Validators.email]),
      scholarshipped: new FormControl({value: false, disabled: false}, [])
    });
  }

  public get f() { return this.frm.controls; }

  public retrieve(): void {
    this.service.retrieve().subscribe(response => {
      // this.instructores = response.data;
      this.instructores = response.data.filter(row =>  row.is_selected === '0' && row.is_scholarshipped === '0' );
      this.instructoresAssignated = response.data.filter(row =>  row.is_selected === '1' && row.is_scholarshipped === '0');
      this.instructoresScholarshipped = response.data.filter(row => row.is_scholarshipped === '1');

      this.config = {
        itemsPerPage: 6,
        currentPage: this.currentPageA,
        totalItems: this.instructores.length,
        id: 'catalogoInstructores'
      };
      this.configScoolarshipped = {
        itemsPerPage: 6,
        currentPage: this.currentPageB,
        totalItems: this.instructoresScholarshipped.length,
        id: 'catalogoInstructoresScoolarshipped'
      };
      this.scollarshipedV(this.instructoresScholarshipped);
    }, error => {
      this.toastr.error('No se pudo conectar a el servidor', 'Error');
    });
  }
  public retrieceExpediente(): void {
    const carnet = this.f.carnet.value;
    this.service.checkByCarnet(carnet).subscribe(result => {
      if (result.data.length === 0) {
        this.existInstructor = false;
        this.expedienteService.getPensum({carnet}).subscribe( response => {
          // console.log(response);
          this.row = response.data;

          if (this.row.cum === '') {
            this.toastr.warning('El estudiante es de nuevo ingreso', 'Aviso');
          } else {
            this.f.nombre.setValue(this.row.nombre);
            this.f.carrera.setValue(this.row.carrera);
            this.f.cum.setValue(this.row.cum);
          }
        }, error => {
          this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
        });
      } else {
        this.toastr.warning('El instructor ya esta registrado');
        this.existInstructor = true;
      }
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }
  public retrieveData(): void {}
  public postData(): void {
    const carnet = this.f.carnet.value;
    const pEmail = this.f.personalEmail.value;

    // this.service.checkByCarnet(carnet).subscribe(response => {
       if (!this.existInstructor) {

         if (this.row) {
           const notas = this.evaluateNotas(
             this.mapNotas(this.row.pensum)
           ); // (this.row.notas) ? this.trimmingNotas(this.row.notas) : [];
           const cum = this.f.cum.value;
           const frmData = {

             nombre: this.f.nombre.value,
             carnet: carnet,
             carrera: this.f.carrera.value,
             cum: cum,
             telefono: this.f.phone.value,
             email: carnet.concat('@mail.utec.edu.sv'),
             emailPersonal: pEmail,
             username: carnet, // pEmail.split('@')[0],
             notas: notas,
             is_scholarshipped: this.f.scholarshipped.value
           };
           console.log(frmData);

           this.cumIsValid = (this.validateCUM(cum));
           if (!this.cumIsValid) {
             this.toastr.info('El CUM del estudiante es inferior al requerido', 'Informacion');
           } else {
             this.toastr.info('El CUM del estudiante se encuentra en el rango', 'Informacion');
           }

           if (this.evaluateNotas(notas).length > 2) {
             this.service.make(frmData).subscribe(result => {
               console.log(result);
               if (!result.error) {
                 this.retrieve();
                 this.frm.reset();
                 this.initForm();
                 this.row = false;
                 this.f.carnet.setValue('00-0000-0000');
                 this.toastr.success(environment.MESSAGES.CREATED_OK, 'Ok');
               } else {
                 this.toastr.error('No se pudo procesar', 'Error');
               }
             }, error => {
               this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
             });
           } else {
             this.toastr.warning('El estudiante no posee notas que lo respalden', 'Aviso');
           }
         } else {
           this.toastr.warning('Falto la recuperacion de datos del instructor');
         }
      } else {
        this.toastr.warning('El instructor ya esta registrado');
         this.f.carnet.setValue('00-0000-0000');
      }
    // }, error => {
    //   this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    // });
  }
  public patchData(): void {}

  public openModal(content, row): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public selectForAssign(row): void {
    if (row.capacitaciones.length > 0 ) {
      if (row.capacitaciones.length === 3) {
        if (row.notas.length > 0) {
          this.instructorSharingService.setInstructor(row);
          this.changeStatusElement(
            this.identifyElement(row)
          );
        } else {
          this.toastr.warning('El instructor no posee notas para evaluar', environment.MESSAGES.WARN);
        }
      } else {
        this.toastr.warning('El instructor debe de poseer las tres capacitaciones', environment.MESSAGES.WARN);
      }
    } else {
      this.toastr.warning('El instructor no puede se asignado por que no posee capacitaciones', environment.MESSAGES.WARN);
    }
  }

  public identifyElement(row): any {
    if (row.is_scholarshipped === '1') {
      return {
        index: this.instructoresScholarshipped.indexOf(row),
        type: 'scholarshipped',
        id: row.id
      };
    } else {
     return  {
       index: this.instructores.indexOf(row),
       type: 'normal',
       id: row.id
     };
    }
  }

  public changeStatusElement(result): void {

    if (result.type === 'scholarshipped') {
      const changed = localStorage.getItem(`changed-${ result.id }`);
      if (changed === 'false') {
        localStorage.setItem(`changed-${ result.id }`, 'true');
      } else {
        localStorage.setItem(`changed-${ result.id }`, 'false');
      }
      this.instructoresScholarshipped[result.index].is_asignated = false;
    } else {
      this.instructores[result.index].is_selected =  (this.instructores[result.index].is_selected === '0') ? '1' : '0';
      this.instructores[result.index].is_asignated = false;
    }
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

  public pageChanged(event, cnf): void {
    this[cnf].currentPage = event;
    console.log(event);
  }

  public validateCUM(c): boolean {
    return Number(c) >= 7.5;
  }

  public evaluateNotas(notas): Array<any> {
    return notas.filter(item => Number(item.nota) >= 8);
  }

  public scoolarshippedAssignations(instructor): Array<any> {
    const instructorias = instructor.instructoria;
    const ciclo = this.token.people.settings.ciclo.nombre;
    return instructorias.filter(row => row.ciclo.nombre === ciclo && row.is_enabled === '1');
  }

  public scoolarshippedInstructorValidator(instructor) {
    if (this.scoolarshippedAssignations(instructor).length >= 3) {
      return true;
    } else {
      const changed = localStorage.getItem(`changed-${ instructor.id }`);
      return changed !== 'false';
    }
  }

  public mapNotas(pensum): Array<any> {
    const m = [];
    pensum.forEach((row) => {
      const materias = row.materias;
      const q = materias.map((i) => {
        return {
          mat_codigo: this.trimWhiteSpaces(i.mai_codmat),
          mat_nombre: this.trimWhiteSpaces(i.matnom),
          estado: (i.nf >= 6) ? 'Aprobada' : 'Desaprobada',
          nota: i.nf,
          ciclo: row.ciclo
        };
      });

      m.push(q);
    });
    return  m.reduce((acc, it) => [...acc, ...it]);
  }

  public scollarshipedV(instructors): void {
    instructors.forEach((row) => {
      localStorage.setItem(`changed-${ row.id }`, 'false');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
