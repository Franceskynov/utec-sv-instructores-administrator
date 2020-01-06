import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Platform': 'website',
      'Client': environment.CLIENT_AUTHORIZATION
    });
  }
  public retrieve(frmData) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('expediente', '?carnet=', frmData.carnet ), {
      headers: this.headers
    }).pipe(map(data => {
        return data;
      }));
  }

  public getPensum(frmData) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat(`pensum?carnet=${frmData.carnet}`), {
      headers: this.headers
    }).pipe(map(data => {
        return data;
      }));
  }
}
