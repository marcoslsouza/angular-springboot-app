import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import { ServicoPrestadoBusca } from './ServicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome : string;
  mes : number;
  meses : number[];
  lista : ServicoPrestadoBusca[];
  message : string;

  constructor(private servicoPrestadoService : ServicoPrestadoService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
  }

  consultar() {

    this.servicoPrestadoService
      .buscar(this.nome, this.mes)
      .subscribe(response => { 
        this.lista = response;
        this.message = null;
        if(this.lista.length <= 0)
           this.message = 'Nenhum registro encontrado!';
      } );
  }

  onSubmit() {
    this.consultar();
  }

}
