import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {

  public filterValue: string;
  public rows: Array<any>;
  public limit: Number;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: UsuarioService,
  ) { }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.retrieveData();
  }

  public retrieveData(): void {
    this.service.retrieve().subscribe(result => {
      if (!result.error) {
        console.log(result.data);
        this.rows = result.data;
      }
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
