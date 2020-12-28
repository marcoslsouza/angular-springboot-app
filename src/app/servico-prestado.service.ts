import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/ServicoPrestadoBusca';

import { ServicoPrestado } from './servico-prestado/ServicoPrestado';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiUrl : string = environment.apiUrlBase;

  constructor(private http : HttpClient) { }

  salvar(servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(`${this.apiUrl}/sistema-vendas/api/servicos-prestados`, servicoPrestado);
  }

  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams()
      .set('nome', nome)
      .set('mes', mes != null ? mes.toString() : '');
    
    const url = this.apiUrl + "/sistema-vendas/api/servicos-prestados?" + httpParams.toString();
    
    return this.http.get<any>(url.replace('/?', '?'));
  }
}
