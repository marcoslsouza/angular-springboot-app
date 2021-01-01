// Criado para cadastrar usuario, logar e recuperar o token

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from './login/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = environment.apiUrlBase;
  tokenUrl : string = environment.apiUrlBase + environment.obterTokenUrl;
  clientID : string = environment.clientId;
  clientSecret : string = environment.clientSecret;

  constructor(private http : HttpClient) { }

  // Salva usuario
  salvar(usuario : Usuario) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sistema-vendas/api/usuarios`, usuario);
  }

  tentarLogar(username : string, password : string) : Observable<any> {
    // HttpParams recebe os parametros enviados. Ex. login e senha (Sao parametros de formulario)
    const params = new HttpParams().set('username', username).set('password', password).set('grant_type', 'password');

    // Para enviar o clientId e o client secret.
    // btoa codifica string. Ex. Basic bXktYW5ndWxhci1hcHA6QDMyMQ==
    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded' 
    }

    // E a mesma coisa que {headers : headers}
    return this.http.post(this.tokenUrl, params.toString(), {headers});
  }
}
