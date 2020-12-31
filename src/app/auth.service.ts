import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from './login/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = environment.apiUrlBase;

  constructor(private http : HttpClient) { }

  // Salva usuario
  salvar(usuario : Usuario) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sistema-vendas/api/usuarios`, usuario);
  }
}
