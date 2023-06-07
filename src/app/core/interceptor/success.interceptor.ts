import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

  constructor(private toaster: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)

  }
}

      // .pipe(
      //   tap((event: HttpEvent<any>) => {
      //     if (event instanceof HttpResponse && event.status === 200) {
      //       this.toaster.success('Success message', 'Success');
      //     }
      //   }, (error) => {
      //     if (error.status === 0) {
      //       this.toaster.error('Error message', 'Error');
      //     }
      //   })
      // );