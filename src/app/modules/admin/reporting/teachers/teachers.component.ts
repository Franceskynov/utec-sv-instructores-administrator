import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MateriasService } from 'app/services/materias.service';
import { environment } from 'environments/environment';
import { ReportingService } from 'app/services/reporting.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeachersComponent implements OnInit {

  public isFiltered: boolean;
  public frm: FormGroup;
  public url: string;
  public materias: Array<any>;
  public permissions: any;
  public ctrls: Array<any>;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: MateriasService,
    private reporting: ReportingService,
  ) { }

  ngOnInit() {
    this.isFiltered = false;
    this.ctrls = ['materia'];
    this.permissions = {
      materia: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.retrieve();
  }

  public retrieve(): void {
    this.service.retrieve().subscribe(response => {
      this.materias = response.data;
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public filterData(fn): void {
    const materia = this.frm.controls.materia.value;
    let uri = environment.CONTROL_URL_API.concat('reporte/docentes');
    // this.isFiltered = true;
    uri = uri.concat('?materia=', materia.id);
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
