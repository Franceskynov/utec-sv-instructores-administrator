import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private http: HttpClient) { }
  public retrieve() {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('facultad'))
      .pipe(map(data => {
        return data;
      }));
  }

  public make(frmData) {
    return this.http.post<any>(environment.CONTROL_URL_API.concat('facultad'), frmData)
      .pipe(map(data => {
        return data;
      }));
  }

  public modify(item, frmData) {
    return this.http.patch<any>(environment.CONTROL_URL_API.concat(`facultad/${ item }`), frmData)
      .pipe(map(data => {
        return data;
      }));
  }

  public destroy(item) {
    return this.http.delete<any>(environment.CONTROL_URL_API.concat(`facultad/${ item }`))
      .pipe(map(data => {
        return data;
      }));
  }
}
