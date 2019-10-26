import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CicloService } from 'app/services/ciclo.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { PermissionsService } from 'app/services/permissions.service';
import { ReportingService } from 'app/services/reporting.service';
import { DecodeTokenService } from 'app/services/decode-token.service';

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
  public token: any;
  constructor(
    private modalService: NgbModal,
    private service: CicloService,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private reporting: ReportingService,
    private decodeToken: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.token = this.decodeToken.decodePayload();
    this.retrieve();
    this.isFiltered = false;
    this.ctrls = ['ciclo'];
    this.permissions = {
      ciclo: {
        required: true
      },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.frm.controls.ciclo.patchValue(this.token.people.settings.ciclo);
  }

  public retrieve(): void {
    this.service.retrieve().subscribe( response => {
      this.ciclos = response.data;
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public filterData(fn): void {
    this.isFiltered = false;
    const ciclo = this.frm.controls.ciclo.value;
    const uri = environment.CONTROL_URL_API.concat('reporte/asignacion', '?ciclo=', ciclo.id);

    this.reporting.downloadReport(uri).subscribe( result => {
      const newBlob = new Blob([result], { type: 'application/pdf' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      this.url = window.URL.createObjectURL(newBlob);
      this.isFiltered = true;
      fn();
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public openModal(content): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }
}
