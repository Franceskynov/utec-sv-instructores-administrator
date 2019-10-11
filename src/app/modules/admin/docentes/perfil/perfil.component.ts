import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocenteService } from 'app/services/docente.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {

  public docenteId: any;
  public row: any;
  constructor(
    private route: ActivatedRoute,
    private service: DocenteService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.row = {
      email: null,
      nombre: null,
      oficina: null,
      telefono: null,
      apellido: null,
      especialidades: []
    };
    this.docenteId = this.route.snapshot.paramMap.get('id');
    this.retrievePerfil();
  }

  public retrievePerfil(): void {
    this.service.retrieveById(this.docenteId).subscribe(response => {
      if (!response.error) {
        this.row = response.data;
        console.log(this.row);
      } else {
        this.toaster.warning(response.message, environment.MESSAGES.WARN);
      }
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
