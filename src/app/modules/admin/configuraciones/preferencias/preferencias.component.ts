import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CicloService } from 'app/services/ciclo.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { PermissionsService } from 'app/services/permissions.service';
import { SettingService } from 'app/services/setting.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreferenciasComponent implements OnInit {

  public id: any;
  public frm: FormGroup;
  public emailFrm: FormGroup;
  public socialFrm: FormGroup;
  public minimumFrm: FormGroup;
  public evaluacionFrm: FormGroup;
  public url: string;
  public ciclos: Array<any>;
  public permissions: any;
  public socialPermissions: any;
  public emailPermissions: any;
  public minimumPermissions: any;
  public evaluacionPermissions: any;
  public ctrls: Array<any>;
  public emailCtrls: Array<any>;
  public socialCtrls: Array<any>;
  public minimumCtrls: Array<any>;
  public evaluacionCtrls: Array<any>;
  constructor(
    private service: CicloService,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private settingService: SettingService,
  ) { }

  ngOnInit() {
    this.ctrls = ['ciclo'];
    this.emailCtrls = ['docente_email_prefix', 'instructor_email_prefix'];
    this.socialCtrls = ['horas_sociales_a_asignar'];
    this.minimumCtrls = ['minimun_cum', 'minimum_score'];
    this.evaluacionCtrls = ['autoevaluacion_percentage', 'evaluacion_rrhh_percentage', 'evaluacion_docente_percentage'];
    this.permissions = {
      ciclo: { required: true },
    };
    this.emailPermissions = {
      docente_email_prefix: { required: true },
      instructor_email_prefix: { required: true}
    };
    this.socialPermissions = {
      horas_sociales_a_asignar: { required: true }
    };
    this.minimumPermissions = {
      minimun_cum: { required: true },
      minimum_score: { required: true }
    };
    this.evaluacionPermissions = {
      autoevaluacion_percentage: { required: true },
      evaluacion_rrhh_percentage: { required: true },
      evaluacion_docente_percentage: { required: true },
    };
    this.frm = this.permissionsService.findPermission(this.ctrls, this.permissions);
    this.emailFrm = this.permissionsService.findPermission(this.emailCtrls, this.emailPermissions);
    this.socialFrm = this.permissionsService.findPermission(this.socialCtrls, this.socialPermissions);
    this.minimumFrm = this.permissionsService.findPermission(this.minimumCtrls, this.minimumPermissions);
    this.evaluacionFrm = this.permissionsService.findPermission(this.evaluacionCtrls, this.evaluacionPermissions);
    this.retrieve();
  }

  public retrieve(): void {
    this.service.retrieve().subscribe( response => {
      this.ciclos = response.data;
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });

    this.settingService.retrieve().subscribe(response => {
      const data = response.data;
      this.id = data.id;
      this.frm.controls.ciclo.patchValue(data.ciclo);
      this.emailFrm.controls.docente_email_prefix.patchValue(data.docente_email_prefix);
      this.emailFrm.controls.instructor_email_prefix.patchValue(data.instructor_email_prefix);
      this.socialFrm.controls.horas_sociales_a_asignar.patchValue(data.horas_sociales_a_asignar);
      this.minimumFrm.controls.minimun_cum.patchValue(data.minimun_cum);
      this.minimumFrm.controls.minimum_score.patchValue(data.minimum_score);
      this.evaluacionFrm.controls.autoevaluacion_percentage.patchValue(data.autoevaluacion_percentage);
      this.evaluacionFrm.controls.evaluacion_rrhh_percentage.patchValue(data.evaluacion_rrhh_percentage);
      this.evaluacionFrm.controls.evaluacion_docente_percentage.patchValue(data.evaluacion_docente_percentage);
    }, () => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public saveSettings(): void {
    const formData = {
      ciclo_id: this.frm.controls.ciclo.value.id,
      horas_sociales_a_asignar: this.socialFrm.controls.horas_sociales_a_asignar.value,
      docente_email_prefix: this.emailFrm.controls.docente_email_prefix.value,
      instructor_email_prefix: this.emailFrm.controls.instructor_email_prefix.value,
      autoevaluacion_percentage: this.evaluacionFrm.controls.autoevaluacion_percentage.value,
      evaluacion_rrhh_percentage: this.evaluacionFrm.controls.evaluacion_rrhh_percentage.value,
      evaluacion_docente_percentage: this.evaluacionFrm.controls.evaluacion_docente_percentage.value
    };
    this.settingService.modify(this.id, formData).subscribe(response => {
      if (!response.error) {
        this.toastr.info(environment.MESSAGES.MODIFIED_OK, environment.MESSAGES.OK);
        setTimeout(() => {
          location.href = '/admin/#/login';
          localStorage.clear();
        }, 1500);
      } else {
        this.toastr.warning(environment.MESSAGES.SERVICE_WARN);
      }
    }, error => {
      console.log(error.body);
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public validatePercentage(...args): boolean {
   let percentage = 0;
    for (let i = 0; i < args.length; i++) {
      percentage += Number(args[i]);
    }
    return (percentage !== 1);
  }

}
