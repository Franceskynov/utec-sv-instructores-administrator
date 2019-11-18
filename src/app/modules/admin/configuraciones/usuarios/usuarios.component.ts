import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { UsuarioService } from 'app/services/usuario.service';
import { SharedService } from 'app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {

  private subscription: Subscription;
  public filterValue: string;
  public rows: Array<any>;
  public limit: Number;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: UsuarioService,
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
