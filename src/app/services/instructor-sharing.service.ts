import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InstructorSharingService {

  private instructorData = new Subject<string>();
  private instructorExchangeData = new Subject<string>();
  constructor() { }

  /**
   *
   * @param message
   */
  public setInstructor(message) {
    this.instructorData.next(message);
  }

  /**
   *
   */
  public removeInstructor() {
    this.instructorData.next();
  }

  /**
   *
   */
  public getInstructor(): Observable<any> {
    return this.instructorData.asObservable();
  }

  /**
   *
   * @param message
   */
  public setStatus(message) {
    this.instructorExchangeData.next(message);
  }

  /**
   *
   */
  public getStatus(): Observable<any> {
    return this.instructorExchangeData.asObservable();
  }

}
