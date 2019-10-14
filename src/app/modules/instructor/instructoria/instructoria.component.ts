import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { InstructorService } from 'app/services/instructor.service';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-instructoria',
  templateUrl: './instructoria.component.html',
  styleUrls: ['./instructoria.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructoriaComponent implements OnInit {

  public token: any;
  public limit: Number;
  public row: any;
  constructor(
    private toaster: ToastrService,
    private instructorService: InstructorService,
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.token = this.decodeToken.decodePayload();
    this.getInstructorInstructory();
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
          }
        }
      ]
    };
  }

  public getInstructorInstructory(): void {
    this.instructorService.retrieveById(this.token.people.id).subscribe(response => {
      if (!response.error) {
        this.row = response.data;
      } else {
        this.toaster.warning(response.message, environment.MESSAGES.WARN);
      }
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
