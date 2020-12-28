import { Injectable } from '@angular/core'; // Injectable => Injetavel em outros servicos, e outros componentes.
import { Cliente } from './clientes/Cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl : string = environment.apiUrlBase;

  constructor(private http : HttpClient) { 
  }

  // Observable => Transforma a aplicacao em uma aplicacao reativa. Nas requisicoes assicronas ao terminar uma requisicao
  // sera passado para a outra, ja com o Observable, ele fica observando ate que essa requisicao tenha o retorno.
  salvar(cliente : Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/sistema-vendas/api/cliente/salvar`, cliente);
  }

  atualizar(cliente : Cliente) : Observable<any> {
    return this.http.put<Cliente>(`${this.apiUrl}/sistema-vendas/api/cliente/${cliente.id}`, cliente);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/sistema-vendas/api/cliente`);
  }

  getClienteById(id : number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/sistema-vendas/api/cliente/${id}`);
  }

  // any => Não tem retorno da API
  deletar(cliente : Cliente) : Observable<any> {
    return this.http.delete<Cliente>(`${this.apiUrl}/sistema-vendas/api/cliente/${cliente.id}`);
  }
}
