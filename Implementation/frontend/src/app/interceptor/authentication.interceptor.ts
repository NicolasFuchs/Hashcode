import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  public errors: EventEmitter<HttpErrorResponse>;

  private _xAuthToken: string;

  public constructor() {
    this.errors = new EventEmitter<HttpErrorResponse>();
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;

    if (typeof this._xAuthToken !== 'undefined') {
      request = req.clone({headers: req.headers.set('X-Auth-Token', this._xAuthToken)});
    } else {
      request = req.clone();
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this._xAuthToken = event.headers.get('x-auth-token');
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errors.emit(err);
      }
    });
  }
}
