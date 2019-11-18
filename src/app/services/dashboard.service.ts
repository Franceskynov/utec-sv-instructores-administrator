import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  public retrieve(cicloId) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('dashboard?cicloId=', cicloId))
      .pipe(map(data => {
        return data;
      }));
  }
}
