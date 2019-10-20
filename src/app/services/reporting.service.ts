import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http: HttpClient) { }
  public downloadReport(uri) {
    // @ts-ignore
    return this.http.get<any>(uri, { responseType: 'blob' })
      .pipe(map(data => {
        return data;
      }));
  }
}
