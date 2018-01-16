import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
// Pipeable operators
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set request Authorization header
    const authReq = req.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });

    // Send the new, authorized request
    return next.handle(authReq).pipe(
      catchError(this._catchError)
    );
  }

  private _catchError(error, caught): Observable<any> {
    console.log('Error occurred:', error);
    if (error.status === 401) {
      // this.auth.login();
    }
    return Observable.throw(error);
  }
}
