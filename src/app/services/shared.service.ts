import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  fixWidthTable() {
    this.subject.next();
  }

  getFixWidthTable() {
    return this.subject.asObservable();
  }
}
