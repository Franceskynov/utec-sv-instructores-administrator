import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private http: HttpClient) { }
  public update(frmData) {
    return this.http.put<any>(environment.CONTROL_URL_API.concat('credentials'), frmData)
      .pipe(map(data => {
        return data;
      }));
  }
}
