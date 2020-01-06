import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { FormGroup } from '@angular/forms';
import { InstructorService } from 'app/services/instructor.service';
import { environment } from 'environments/environment';
import { ReportingService } from 'app/services/reporting.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructorsComponent implements OnInit {

  public isFiltered: boolean;
  public frm: FormGroup;
  public url: string;
  public carreras: Array<any>;
  public permissions: any;
  public ctrls: Array<any>;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private service: InstructorService,
    private reporting: ReportingService,
  ) { }

  ngOnInit() {
    this.isFiltered = false;
    this.ctrls = ['carrera', 'capacitaciones', 'scholarshipped'];
    this.permissions = {
      carrera: {
        required: true
      },
      scholarshipped: {},
      capacitaciones: {}
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.frm.controls.scholarshipped.patchValue(false);
    this.retrieve();
  }

  public retrieve(): void {
    this.service.carreras().subscribe( response => {
      this.carreras = response.data;
      console.log(response);
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }
  public filterData(fn): void {
    const capaciataciones = this.frm.controls.capacitaciones.value;
    this.isFiltered = false;
    const carrera = this.frm.controls.carrera.value;
    const isScholarshipped = this.frm.controls.scholarshipped.value;
    let uri = environment.CONTROL_URL_API.concat('reporte/instructores');
    uri = uri.concat('?carrera=', carrera.carrera).concat(`&capacitaciones=${ capaciataciones ? 'todas' : 'ninguna' }`,
      `&scholarshipped=${isScholarshipped}`);

    this.reporting.downloadReport(uri).subscribe( result => {
      const newBlob = new Blob([result], { type: 'application/pdf' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      this.url = window.URL.createObjectURL(newBlob);
      this.isFiltered = true;
      fn();
    }, () => {
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
