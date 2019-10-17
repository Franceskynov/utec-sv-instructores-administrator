import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { InstructorService } from 'app/services/instructor.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardsComponent implements OnInit {

  public row: any;
  public token: any;
  constructor(
    private decodeToken: DecodeTokenService,
    private instructorService: InstructorService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    this.token = {};
    this.row = {
      score: 0
    };
    this.token = this.decodeToken.decodePayload();
    this.getInstructorInstructory();
  }

  public getInstructorInstructory(): void {
    this.instructorService.retrieveById(this.token.people.id).subscribe(response => {
      if (!response.error) {
        this.row = response.data;
      } else {
        this.toaster.warning(response.message, environment.MESSAGES.WARN);
      }
    }, error => {
      this.toaster.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
    });
  }

}
