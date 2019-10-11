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

  public retrieveCapacitaciones(): void {
    this.capacitacionService.retrieve().subscribe(result => {
      this.capacitaciones = result.data;
      console.log(result);
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public retrieveProfile(): void {
     const id = this.route.snapshot.paramMap.get('id');
     this.service.retrieveById(id).subscribe(result => {
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

}
