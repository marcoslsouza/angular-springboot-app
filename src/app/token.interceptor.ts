import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token');

    const url = request.url;

    // Interceptar apenas quando tiver token e quando a url nao for /oauth/token.
    // endsWith verifica se a string finaliza com o valor /oauth/token.
    if(tokenString && !url.endsWith('/oauth/token')) {
      // Volta o token de string para json
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      /*const headers = {
        'Authorization' : 'Bearer ' + token.access_token
      }*/
      request = request.clone({
        setHeaders : {
          Authorization : 'Bearer ' + jwt
        }
      });
    }
    return next.handle(request);
  }
}
