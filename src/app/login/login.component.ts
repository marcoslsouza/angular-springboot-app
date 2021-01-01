import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;
  cadastrando : boolean;
  mensagemSucesso : string;
  errors : String[];
  loginError : string;

  constructor(private router : Router, private auth : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth
      .tentarLogar(this.username, this.password)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      errorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      });

    //console.log(`User: ${this.username}, password: ${this.password}`);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
    this.errors = null;
    this.mensagemSucesso = null;
  }

  cadastrar() {
    let usuario : Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.auth.salvar(usuario).subscribe(response => {
      this.errors = null;
      this.mensagemSucesso = 'Cadastro realizado com sucesso! Efetue o login.';
      this.cadastrando = false;
    },
    responseError => {
      this.errors = responseError.error.errors;
      this.mensagemSucesso = null;
    })
  }
}
