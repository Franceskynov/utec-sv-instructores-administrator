import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   *
   */
  public isLoading = new Subject<boolean>();
  constructor() { }

  /**
   *
   */
  public show(): void {
    this.isLoading.next(true);
  }

  /**
   *
   */
  public hide(): void {
    this.isLoading.next(false);
  }
}
