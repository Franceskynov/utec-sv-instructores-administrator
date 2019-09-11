import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  constructor(private http: HttpClient) { }
  public retrieve() {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('ciclo'))
      .pipe(map(data => {
        return data;
      }));
  }

  public make(frmData) {
    return this.http.post<any>(environment.CONTROL_URL_API.concat('ciclo'), frmData)
      .pipe(map(data => {
        return data;
      }));
  }

  public modify(item, frmData) {
    return this.http.patch<any>(environment.CONTROL_URL_API.concat(`ciclo/${ item }`), frmData)
      .pipe(map(data => {
        return data;
      }));
  }

  public destroy(item) {
    return this.http.delete<any>(environment.CONTROL_URL_API.concat(`ciclo/${ item }`))
      .pipe(map(data => {
        return data;
      }));
  }
}
