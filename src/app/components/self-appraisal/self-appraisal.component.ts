import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DecodeTokenService } from 'app/services/decode-token.service';
import { EvaluationService } from 'app/services/evaluation.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-self-appraisal',
  templateUrl: './self-appraisal.component.html',
  styleUrls: ['./self-appraisal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelfAppraisalComponent implements OnInit {

  public token: any;
  public nombre: string;
  public responsabilidad: number;
  public dominioMateria: number;
  public compromiso: number;
  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private tokenService: DecodeTokenService,
    private evaluationService: EvaluationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.token = this.tokenService.decodePayload();
    this.nombre = this.route.snapshot.paramMap.get('nombre');
    this.responsabilidad = 0;
    this.dominioMateria = 0;
    this.compromiso = 0;

    console.log(this.token);
    this.check();
  }

  public check(): void {
    this.evaluationService.checkSelfAppraisal({
      instructorId: this.token.people.id,
      asignacionName: this.nombre
    }).subscribe(response => {
      console.log(response);
      if (!response.error) {
        if (response.data) {
          console.log('data');
        } else {
          this.router.navigate(['/']);
        }
      }
    }, error => {
      this.toaster.warning(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.SERVICE_WARN);
    });
  }

  public evaluate(): void {
    const score = this.calcScore();
    console.log(score);
    console.log(this.nombre);
  }

  public calcScore(): number {
    return Number(
      (( this.responsabilidad + this.dominioMateria + this.compromiso ) / 3).toFixed(2)
    );
  }

}
