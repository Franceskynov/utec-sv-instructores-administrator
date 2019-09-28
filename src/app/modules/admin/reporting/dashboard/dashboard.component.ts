import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { DashboardService } from 'app/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public data: any;
  constructor(
    private service: DashboardService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.data = {
      docentes: 0,
      instructores: 0,
      usuarios: 0,
      instructorias: 0
    };
    this.retrieveData();
  }

  public retrieveData(): void {
    this.service.retrieve().subscribe(response => {
      this.data = response.data;
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
