import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CicloService } from 'app/services/ciclo.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import {PermissionsService} from 'app/services/permissions.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreferenciasComponent implements OnInit {

  public frm: FormGroup;
  public url: string;
  public ciclos: Array<any>;
  public permissions: any;
  public ctrls: Array<any>;
  constructor(
    private service: CicloService,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
  ) { }

  ngOnInit() {
    this.ctrls = ['ciclo'];
    this.permissions = {
      ciclo: {
        required: true
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.retrieve();
  }

  public retrieve(): void {
    this.service.retrieve().subscribe( response => {
      this.ciclos = response.data;
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
