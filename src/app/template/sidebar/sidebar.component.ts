import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: string;

  constructor(private auth: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.getUsuarioAutenticado();
  }

  logout() {
    this.auth.encerraSessao();
    this.router.navigate(['/login']);
  }

}
