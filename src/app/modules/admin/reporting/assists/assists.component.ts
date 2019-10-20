import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CicloService } from 'app/services/ciclo.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { PermissionsService } from 'app/services/permissions.service';

@Component({
  selector: 'app-assists',
  templateUrl: './assists.component.html',
  styleUrls: ['./assists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssistsComponent implements OnInit {

  public isFiltered: boolean;
  public frm: FormGroup;
  public url: string;
  public ciclos: Array<any>;
  public permissions: any;
  public ctrls: Array<any>;
  constructor(
    private modalService: NgbModal,
    private service: CicloService,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
  ) { }

  ngOnInit() {
    this.retrieve();
    this.isFiltered = false;
    this.ctrls = ['ciclo'];
    this.permissions = {
      ciclo: {
        required: true
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  public retrieve(): void {
    this.service.retrieve().subscribe( response => {
      this.ciclos = response.data;
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public filterData(fn): void {
    const ciclo = this.frm.controls.ciclo.value;
    console.log(ciclo);
    this.isFiltered = true;
    this.url = environment.CONTROL_URL_API.concat('reporte/asignacion', '?ciclo=', ciclo.id);
    fn();
  }

  public openModal(content): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }
}
