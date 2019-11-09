import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { InstructorService } from 'app/services/instructor.service';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { SharedService } from 'app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistorialComponent implements OnInit {

  private subscription: Subscription;
  public token: any;
  public limit: Number;
  public rows: Array<any>;
  constructor(
    private toaster: ToastrService,
    private instructorService: InstructorService,
    private decodeToken: DecodeTokenService,
    private sharedService: SharedService,
  ) {
    const thisComponent = this;
    this.subscription = this.sharedService.getFixWidthTable().subscribe(
      result => {
        setInterval((e) => {
          thisComponent.rows = [...thisComponent.rows];
        }, 450);
      });
  }

  ngOnInit() {
    this.limit = environment.MAX_ROWS_PER_PAGE;
    this.token = this.decodeToken.decodePayload();
    this.getInstructorHistory();
  }

  public getInstructorHistory(): void {
    this.instructorService.retrieveById(this.token.people.id).subscribe(response => {
      if (!response.error) {
        this.rows = response.data.historial;
      } else {
        this.toaster.warning(response.message, environment.MESSAGES.WARN);
      }
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
