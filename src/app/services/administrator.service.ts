import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  public retrieve() {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('administrator'))
      .pipe(map(data => {
        return data;
      }));
  }

  public retrieveById(id) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('administrator/', id))
      .pipe(map(data => {
        return data;
      }));
  }

  public make(frmData) {
    return this.http.post<any>(environment.CONTROL_URL_API.concat('administrator'), frmData)
      .pipe(map(data => {
        return data;
      }));
  }

  public modify(item, frmData) {
    return this.http.patch<any>(environment.CONTROL_URL_API.concat(`administrator/${ item }`), frmData)
      .pipe(map(data => {
        return data;
      }));
  }
}
