import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { FormGroup } from '@angular/forms';
import { InstructorService } from 'app/services/instructor.service';
import { environment } from 'environments/environment';

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
  ) { }

  ngOnInit() {
    this.isFiltered = false;
    this.ctrls = ['carrera'];
    this.permissions = {
      carrera: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.retrieve();
  }

  public retrieve(): void {
    this.service.carreras().subscribe( response => {
      this.carreras = response.data;
      console.log(response);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }
  public filterData(fn): void {
    const carrera = this.frm.controls.carrera.value;
    let uri = environment.CONTROL_URL_API.concat('reporte/instructores');
    uri = uri.concat('?carrera=', carrera.carrera);
    this.isFiltered = true;
    this.url = uri;
    fn();
  }

  public openModal(content): void {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

}
