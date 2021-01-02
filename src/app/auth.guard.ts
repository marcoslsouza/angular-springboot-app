import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Injetar o AuthService, pois ele e que vai dizer se o usuario esta ou nao logado.
  constructor(private authService : AuthService, private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  state: RouterStateSnapshot): boolean {
    const autenticado = this.authService.isAutenticated();
    if(autenticado)
      return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
