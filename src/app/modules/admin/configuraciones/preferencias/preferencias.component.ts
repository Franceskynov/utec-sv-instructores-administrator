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
  public url: string;
  public ciclos: Array<any>;
  public permissions: any;
  public ctrls: Array<any>;
  constructor(
    private service: CicloService,
    private toastr: ToastrService,
    private permissionsService: PermissionsService,
    private settingService: SettingService,
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

    this.settingService.retrieve().subscribe(response => {
      this.frm.controls.ciclo.patchValue(response.data.ciclo);
      this.id = response.data.id;
      console.log(response);
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

  public saveSettings(): void {
    const formData = {
      ciclo_id: this.frm.controls.ciclo.value.id,
      horas_sociales_a_asignar: 150,
      docente_email_prefix: '@mail.utec.edu.sv',
      instructor_email_prefix: '@mail.utec.edu.sv'
    };
    this.settingService.modify(this.id, formData).subscribe(response => {
      if (!response.error) {
        this.toastr.info(environment.MESSAGES.MODIFIED_OK, environment.MESSAGES.OK);
        setTimeout(() => {
          location.href = '/#/login';
          localStorage.clear();
        }, 1500);
      } else {
        this.toastr.warning(environment.MESSAGES.SERVICE_WARN);
      }
    }, error => {
      this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
