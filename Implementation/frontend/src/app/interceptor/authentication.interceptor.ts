import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import {LocalStorageService} from 'ngx-localstorage';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  public errors: EventEmitter<HttpErrorResponse>;

  private _xAuthToken: string;
  private _onLogout: boolean;

  public constructor(private _localStorageService: LocalStorageService) {
    this.errors = new EventEmitter<HttpErrorResponse>();
    this._xAuthToken = this._localStorageService.get('token');
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;

    this._onLogout = req.url.indexOf('logout') > -1;

    if (this._xAuthToken !== null) {
      request = req.clone({headers: req.headers.set('X-Auth-Token', this._xAuthToken)});
    } else {
      request = req.clone();
    }

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const token: string = event.headers.get('x-auth-token');
        if (token !== null) {
          this._xAuthToken = token;
          this._localStorageService.set('token', this._xAuthToken);
        }
        if (this._onLogout) {
          this._localStorageService.remove('token');
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errors.emit(err);
      }
    });
  }
}
