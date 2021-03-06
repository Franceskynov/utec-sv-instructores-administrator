import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { HistorialService } from 'app/services/historial.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'app/services/permissions.service';
import { FormGroup } from '@angular/forms';
import { EvaluationService } from 'app/services/evaluation.service';
import { SettingService } from 'app/services/setting.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistorialComponent implements OnInit {

  public settings: any;
  public ctrls: Array<String>;
  public permissions: any;
  public frm: FormGroup;
  public filterValue: string;
  public searchColums: Array<any>;
  public rows: Array<any>;
  public row: any;
  public limit: any;
  constructor(
    private historialService: HistorialService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private evaluationService: EvaluationService,
    private settingService: SettingService,
  ) { }

  ngOnInit() {
    this.searchColums = ['instructor', 'materia'];
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.retrieveData();
    this.ctrls = ['nota'];
    this.permissions = {
      nota: {
        required: true,
      },
    };
    this.settings = {
      evaluacion_rrhh_percentage: null,
      evaluacion_docente_percentage: null,
      autoevaluacion_percentage: null
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
  }

  public retrieveData(): void {
    this.historialService.retrieve().subscribe(response => {
      this.rows = response.data;
    }, () => {});
    this.settingService.retrieve().subscribe(response => {
      this.settings = response.data;
      console.log(this.settings);
    }, () => {});
  }

  public openModal(content, row, opt?): void {
    this.modalService.open(content, {
      size: (opt === 'small') ? 'sm' : 'lg',
      backdrop: 'static',
      keyboard: false
    });
    if (row) {
      this.row = row;
    }
  }

  public validateScore(score): boolean {
    return score <= 10 && score > 0;
  }

  public postData(fn): void {
    const score = Number(this.frm.controls.nota.value);
    const formData = {
      score: score,
      historialId: this.row.id
    };

    if (this.validateScore(score)) {
      console.log('nota');
      this.evaluationService.evaluateHumanResources(formData).subscribe(response => {
        if (!response.error) {
          fn();
          this.frm.reset();
          this.retrieveData();
        } else {
          this.toastr.warning(response.message, environment.MESSAGES.WARN);
        }
      }, error => {
        this.toastr.warning(error.message, environment.MESSAGES.WARN);
      });
    } else {
      this.toastr.warning(environment.MESSAGES.INVALID_SCORE, environment.MESSAGES.WARN);
    }
    console.log(formData);
  }

}
