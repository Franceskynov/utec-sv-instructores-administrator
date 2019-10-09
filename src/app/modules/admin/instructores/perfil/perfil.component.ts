import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'app/services/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {

  public searchColumns: Array<any>;
  public searchBox: any;
  public row: any;
  constructor(
    private route: ActivatedRoute,
    private service: InstructorService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
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

}
