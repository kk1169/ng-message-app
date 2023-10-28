import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {

        if (e.status === 401) {
          this.authService.removeCurrentUser();
        }

        const error = e.error?.message || e.statusText;
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}
