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
  loginError : boolean;
  cadastrando : boolean;
  mensagemSucesso : string;

  constructor(private router : Router, private auth : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/home']);
    console.log(`User: ${this.username}, password: ${this.password}`);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    let usuario : Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.auth.salvar(usuario).subscribe(response => {
      this.loginError = false;
      this.mensagemSucesso = 'Cadastro realizado com sucesso! Efetue o login.';
    },
    error => {
      this.loginError = true;
      this.mensagemSucesso = null;
    })
  }
}
