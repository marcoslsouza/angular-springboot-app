import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClientesService } from '../../clientes.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente : Cliente;
  success : boolean = false;
  errors : String[];
  id : number;
  label : string;

  constructor(private service : ClientesService, private router : Router, private activatedRoute : ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    // Recebe o id da url, e faz a pesquisa.
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe(
      urlParams => { this.id = urlParams['id'];
                     if(this.id)
                        this.service.getClienteById(this.id).subscribe(cliente => this.cliente = cliente, error => this.cliente = new Cliente())
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista']);
  }

  onSubmit() {

    if(!this.id) {

      this.service.salvar(this.cliente).subscribe(
        responseSuccess => { 
          this.success = true; 
          this.errors = null; 
          this.cliente = responseSuccess;
          this.label = 'salvo';
        }, 
          responseError => {
            this.success = false;
            this.errors = responseError.error.errors; 
          });
    } else {

      this.service.atualizar(this.cliente).subscribe(
        responseSuccess => { 
          this.success = true; 
          this.errors = null; 
          this.label = 'atualizado';
        },
        responseError => { 
          this.success = false;
          this.errors = responseError.error.errors; 
        }
      );
    }
  }
}
