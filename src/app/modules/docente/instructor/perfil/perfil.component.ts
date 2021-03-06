import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'app/services/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from 'app/services/permissions.service';
import { CapacitacionService } from 'app/services/capacitacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {

  public instructorId: any;
  public capacitaciones: any;
  public frm: FormGroup;
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
  ) { }

  ngOnInit() {
    this.instructorId = this.route.snapshot.paramMap.get('id');
    this.ctrls = ['capacitacion', 'nota'];
    this.permissions = {
      capacitacion: {
        required: true
      },
      nota: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
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
  }

  get f() { return this.frm.controls; }

  public retrieveCapacitaciones(): void {
    this.capacitacionService.retrieve().subscribe(result => {
      this.capacitaciones = result.data;
      console.log(result);
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public retrieveProfile(): void {
     this.service.retrieveById(this.instructorId).subscribe(result => {
       if (!result.error) {
         this.row = result.data;
       }
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
    const formData = {
      instructorId: Number(this.instructorId),
      trainingId: this.f.capacitacion.value.id,
      nota: this.f.nota.value
    };

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
  }

}
