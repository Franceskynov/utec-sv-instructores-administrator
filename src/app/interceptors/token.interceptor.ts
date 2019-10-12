import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor, HttpErrorResponse, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private http: HttpClient,
    private router: Router,
  ) { }


  handleError(err: HttpErrorResponse): Observable<any> {
    let errorMsg;
    if (err.error instanceof Error) {
      errorMsg = `An error occurred: ${err.error.message}`;
    } else {
      errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    if (err.status === 401 || err.status === 400 || err.status === 403) {
      this.router.navigate(['/', 'login']);
    }
    console.error('in autorizado');
    return Observable.throw(errorMsg);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      // return next.handle(cloned);

      return next.handle(cloned).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

          }
        }, error => {

          this.handleError(error);
          // this.handleError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
