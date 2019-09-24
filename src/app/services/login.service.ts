import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public authenticate(frmData) {
    return this.http.post<any>(environment.CONTROL_URL_API.concat('login'), frmData)
      .pipe(map(data => {
        return data;
      }));
  }
}
