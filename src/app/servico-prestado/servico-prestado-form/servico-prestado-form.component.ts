import { Component, OnInit } from '@angular/core';

import { ServicoPrestadoService } from '../../servico-prestado.service';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../../clientes/Cliente';
import { ServicoPrestado } from '../ServicoPrestado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  // Precisaremos criar um combobox
  clientes : Cliente[] = [];
  servicoPrestado : ServicoPrestado;
  success : boolean = false;
  errors : string[];

  constructor(private clienteService : ClientesService, private servicoPrestadoService : ServicoPrestadoService, private router : Router) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe( 
        clientes => this.clientes = clientes 
      );
  }

  onSubmit() {
    console.log(this.servicoPrestado);
    this.servicoPrestadoService
      .salvar(this.servicoPrestado)
      .subscribe(servicoPrestado => {
          this.success = true;
          this.errors = null;
          // Diferente do formulario de clientes, aqui ele vai limpar o formulario para cadastrar um novo serviço prestado.
          this.servicoPrestado = new ServicoPrestado();
        },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
  }

  voltarParaListagem() {
    this.router.navigate(['/servico-prestado/listar']);
  }

}
