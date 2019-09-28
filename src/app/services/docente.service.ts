import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }
  public retrieve() {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('docente'))
      .pipe(map(data => {
        return data;
      }));
  }
}
