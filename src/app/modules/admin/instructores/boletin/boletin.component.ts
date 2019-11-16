import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { SharedService } from 'app/services/shared.service';
import { BoletinService } from 'app/services/boletin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoletinComponent implements OnInit {

  private subscription: Subscription;
  public frm: FormGroup;
  public ctrls: Array<String>;
  public permissions: any;
  public editMode: boolean;
  public limit: Number;
  public rows: Array<any>;
  public idForDestroy: any;
  public idForEdit: any;
  public searchColums: Array<String>;
  public tableValidation: Array<any>;
  public filterValue: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private sharedService: SharedService,
    private service: BoletinService,
  ) {
    const thisComponent = this;
    this.subscription = this.sharedService.getFixWidthTable().subscribe(() => {
        setInterval(() => {
          thisComponent.rows = [...thisComponent.rows];
        }, 1000);
      });
  }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.retrieveData();
    this.initFrm();
  }

  public get f() { return this.frm.controls; }

  public initFrm(): void {
    this.ctrls = ['subject', 'headerMessage', 'message', 'footerMessage', 'areScholarshipped', 'withouthTrainings'];
    this.permissions = {
      subject: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      headerMessage: {
        required: true,
        minLength: 5,
        maxLength: 75
      },
      message: {
        required: true,
        minLength: 5,
        maxLength: 400
      },
      footerMessage: {
        required: true,
        minLength: 5,
        maxLength: 200
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.f.areScholarshipped.patchValue(false);
    this.f.withouthTrainings.patchValue(false);
    this.f.subject.patchValue('Aviso, comunicado, ...');
    this.f.message.patchValue('Estimados estudiantes por este medio se les comunica ...');
    this.f.headerMessage.patchValue('Boletin informativo ...');
    this.f.footerMessage.patchValue('Boletin informativo de la plataforma de instructores');
    this.searchColums = ['subject', 'headerMessage', 'message', 'footerMessage'];
  }

  public retrieveData(): void {
    this.service.retrieve().subscribe(response => {
      this.rows = response.data;
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public openModal(content, row) {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public postData(fn) {
    this.service.make(this.frm.getRawValue()).subscribe(data => {
        if (!data.error) {
          this.toastr.info(environment.MESSAGES.CREATED_OK, 'Ok');
          this.frm.reset();
          this.retrieveData();
          fn();
          this.initFrm();
        } else {
          this.toastr.warning(data.message);
        }
      },
      () => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
      });

  }

}
