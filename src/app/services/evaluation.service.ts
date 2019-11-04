import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }
  public checkSelfAppraisal(frmData) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('evaluation/checkSelfAppraisal',
      '?instructorId=', frmData.instructorId,
      '&asignacionName=', frmData.asignacionName
    )).pipe(map(data => {
        return data;
      }));
  }
}
