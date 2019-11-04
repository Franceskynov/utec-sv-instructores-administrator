import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'app/services/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from 'app/services/permissions.service';
import { CapacitacionService } from 'app/services/capacitacion.service';
import { CicloService } from 'app/services/ciclo.service';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {

  public scholarshipped: any;
  public token: any;
  public ciclos: Array<any>;
  public instructorId: any;
  public capacitaciones: any;
  public frm: FormGroup;
  public frmInstructor: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  public searchColumns: Array<any>;
  public searchBox: any;
  public row: any;
  constructor(
    private route: ActivatedRoute,
    private service: InstructorService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private permissionsService: PermissionsService,
    private capacitacionService: CapacitacionService,
    private cicloService: CicloService,
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.scholarshipped = false;
    this.gotoTop();
    this.instructorId = this.route.snapshot.paramMap.get('id');
    this.ctrls = ['capacitacion', 'nota', 'ciclo'];
    this.permissions = {
      ciclo: {
        required: true
      },
      capacitacion: {
        required: true
      },
      nota: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    // this.frmInstructor =
    this.searchColumns = ['mat_codigo', 'mat_nombre', 'nota', 'estado'];
    this.row = {
      nombre: null,
      carnet: '0000000000',
      cum: null,
      user: {
        username: null,
        email: null,
      },
      historial: [
        {
          id: null,
          nota: null,
          comentarios: null
        }
      ],
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
          }
        }
      ]
    };
    this.retrieveProfile();
    this.retrieveCapacitaciones();
    this.retrieveCiclos();
    this.token = this.decodeToken.decodePayload();
    this.f.ciclo.patchValue(this.token.people.settings.ciclo);
  }

  get f() { return this.frm.controls; }

  public retrieveCapacitaciones(): void {
    this.capacitacionService.retrieve().subscribe(result => {
      this.capacitaciones = result.data;
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public retrieveProfile(): void {
     this.service.retrieveById(this.instructorId).subscribe(result => {
       if (!result.error) {
         this.row = result.data;
         this.scholarshipped = this.row.is_scholarshipped !== '0';
         console.log(result.data);
       }
     }, error => {
       this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
     });
  }

  public retrieveCiclos(): void {
    this.cicloService.retrieve().subscribe(response => {
      this.ciclos = response.data;
      }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public formatCarnet(carnet): string {
    if (carnet !== null) {
      const career = carnet.substr(0, 2);
      const id = carnet.substr(2, 4);
      const year = carnet.substr(6, 10);
      return `${ career }-${ id }-${ year }`;
    } else  {
      return carnet;
    }
  }

  public openModal(content): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  public postData(fn): void {
    const nota = this.f.nota.value;
    const formData = {
      instructorId: Number(this.instructorId),
      trainingId: this.f.capacitacion.value.id,
      nota: nota,
      cicloId: this.f.ciclo.value.id,
    };

    console.log(formData);

    if (this.validateScore(Number(nota))) {
      this.service.instructorTraining(formData).subscribe(response => {
        if (!response.error) {
          this.retrieveProfile();
          fn();
          this.frm.reset();
        } else {
          this.toaster.warning(response.message, environment.MESSAGES.WARN);
        }
      }, error => {
        this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
      });
    } else {
      this.toaster.warning(environment.MESSAGES.INVALID_SCORE, environment.MESSAGES.WARN);
    }
  }

  public validateNota(n): boolean {
    return Number(n) >= 8;
  }

  public changeStatus(): void {
    const formData = {
      isScholarshipped: !this.scholarshipped
    };
    this.service.modify(this.row.id, formData).subscribe(response => {
      if (response.error) {
      }
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public validateScore(score): boolean {
    return score <= 10 && score > 0;
  }

  public gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
