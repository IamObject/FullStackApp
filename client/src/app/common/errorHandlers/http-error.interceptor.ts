import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    //this.toastr = this.inj.get(ToastService);
    if (request.url.indexOf("login") > 0) {

      const token = localStorage.getItem("token");
      request = request.clone({
        setHeaders: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
      });
    } else {

      const token = localStorage.getItem("token");
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest',
          Authorization: "Bearer " + token
        }
      });
    }

    return next.handle(request)
      .pipe(
        // retry(1),
        tap({
          // Succeeds when there is a response; ignore other events
          next: (event) => {
            if (event instanceof HttpResponse) {
            }
          },
          error: (error) => (ok = 'failed')
        }),

        catchError((error: HttpErrorResponse) => {

          switch (error.status) {
            case HttpStatusCode.BadRequest:
              if (error["error"]) {
                this.toast.error(error["error"]["genericMessage"]);
                return throwError(() => error);
              }
              this.toast.error(error.error);
              return throwError(() => error.error);

            case HttpStatusCode.NotFound:
              this.toast.warning('Not found!', 'Item does not exist!');
              return throwError(() => error);

            case HttpStatusCode.Unauthorized:
              this.toast.error('please login', 'You are not authorized!');
              return throwError(() => error);

            case HttpStatusCode.InternalServerError:
              this.toast.error('Internal Server Error');
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              return throwError(() => error);

            default:
              this.toast.error('Something unexpected went wrong!');
              console.log(error);
              break;
          }
          return throwError(error);
        })
      )
  }
}