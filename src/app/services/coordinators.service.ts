import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorsService {

  constructor(private http: HttpClient) { }
  public retrieve() {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('coordinator'))
      .pipe(map(data => {
        return data;
      }));
  }

  public retrieveById(id) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('coordinator/', id))
      .pipe(map(data => {
        return data;
      }));
  }

  public make(frmData) {
    return this.http.post<any>(environment.CONTROL_URL_API.concat('coordinator'), frmData)
      .pipe(map(data => {
        return data;
      }));
  }

  public modify(item, frmData) {
    return this.http.patch<any>(environment.CONTROL_URL_API.concat(`coordinator/${ item }`), frmData)
      .pipe(map(data => {
        return data;
      }));
  }
}
