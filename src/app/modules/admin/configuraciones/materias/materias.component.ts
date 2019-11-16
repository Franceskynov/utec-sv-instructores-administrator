import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { MateriasService } from 'app/services/materias.service';
import { EscuelaService } from 'app/services/escuela.service';
import { SharedService } from 'app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MateriasComponent implements OnInit {

  private subscription: Subscription;
  public schools: Array<any>;
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
    private materiaService: MateriasService,
    private escuelaService: EscuelaService,
    private sharedService: SharedService,
  ) {
    const thisComponent = this;
    this.subscription = this.sharedService.getFixWidthTable().subscribe(
      result => {
        setInterval(() => {
          thisComponent.rows = [...thisComponent.rows];
          console.log('tjis');
        }, 450);
      });
  }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.retrieveData();

    this.ctrls = ['name', 'description', 'school'];
    this.permissions = {
      name: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      description: {
        required: true,
        minLength: 5,
        maxLength: 50
      },
      school: {
        required: true
      }
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.searchColums = ['nombre', 'descripcion'];
  }

  public get f() { return this.frm.controls; }

  public retrieveData(): void {
    this.materiaService.retrieve().subscribe(response => {
      const tmp = response.data;
      this.rows = tmp.filter(row =>  row.is_enabled === '1');
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
    this.escuelaService.retrieve().subscribe(response => {
      this.schools = response.data;
    }, () => {

    });
  }

  public preparaForDelete(content, row) {
    this.modalService.open(content);
    this.idForDestroy = row.id;
  }

  public deleteData() {

    this.materiaService.destroy(this.idForDestroy).subscribe(
      () => {
        this.toastr.success(environment.MESSAGES.DELETION_OK, 'Ok');
        this.retrieveData();
      },
      () => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, 'Error');
      }
    );
  }

  public openModal(content, row) {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });

    if (this.editMode) {
      this.idForEdit = row.id;
       this.f.name.patchValue(row.nombre);
       this.f.description.patchValue(row.descripcion);
       this.f.school.patchValue(row.escuela);
    } else {
      this.f.name.patchValue(' ');
      this.f.description.patchValue(' ');
      this.f.school.patchValue(null);
    }
  }

  public paintError(form, input): any {
    return {
      'is-invalid': form.get(input).touched && !form.get(input).valid,
      'is-valid': form.get(input).touched && form.get(input).valid
    };
  }

  public patchData() {
    const frmData = { nombre: this.f.name.value,  descripcion: this.f.description.value, school_id: this.f.school.value.id  };
    this.materiaService.modify(this.idForEdit, frmData).subscribe(
      () => {
        this.retrieveData();
        this.frm.reset();
        this.toastr.success(environment.MESSAGES.MODIFIED_OK, 'Ok');
      },
      () => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
      });
  }

  public postData() {
    const frmData = { nombre: this.f.name.value,  descripcion: this.f.description.value, school_id: this.f.school.value.id  };
    this.materiaService.make(frmData).subscribe(
      data => {
        if (!data.error) {
          this.toastr.info(environment.MESSAGES.CREATED_OK, 'Ok');
          this.frm.reset();
          this.retrieveData();
        } else {
          this.toastr.warning(data.message);
        }
      },
      () => {
        this.toastr.error(environment.MESSAGES.SERVICE_ERROR, environment.MESSAGES.ERROR);
      });

  }


}
