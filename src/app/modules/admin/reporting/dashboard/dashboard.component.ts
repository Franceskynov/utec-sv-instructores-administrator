import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { DashboardService } from 'app/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { DecodeTokenService } from 'app/services/decode-token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public token: any;
  public data: any;
  constructor(
    private service: DashboardService,
    private toaster: ToastrService,
    private tokenService: DecodeTokenService,
  ) { }

  ngOnInit() {
    this.token = this.tokenService.decodePayload();
    this.data = {
      docentes: 0,
      instructores: 0,
      usuarios: 0,
      instructorias: 0
    };
    this.retrieveData();
  }

  public retrieveData(): void {
    this.service.retrieve(this.token.people.settings.ciclo.id).subscribe(response => {
      this.data = response.data;
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
