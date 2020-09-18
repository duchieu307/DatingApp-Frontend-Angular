import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            if (error instanceof HttpErrorResponse){
                const applicationError = error.headers.get('Application-Error');
                if (applicationError){
                    return throwError(applicationError);
                }
                // xu ly moi chuoi cac error gui ve tu server duoi dang array
                const serverError = error.error;
                let modalStateError = '';
                if (serverError.errors && typeof(serverError.errors) === 'object'){
                    for (const key in serverError.errors){
                        if (serverError.errors[key]){
                            modalStateError += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateError || serverError || 'Server Error');
            }
        })
    );
  }
}

// khai bao provider de them vao app-component
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
