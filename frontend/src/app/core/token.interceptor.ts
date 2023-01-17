import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/Token') || request.url.includes('/login') || request.url.includes('/cadastro-dados/create')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('BEARER');

    if (!token) {
      this.router.navigate(['/login']);
    }

    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      }),
    });

    return next.handle(modifiedRequest);
  }
}
