import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable() //permet d'injecter un service dans un autre service

export class AuthGuard implements CanActivate{ //interface qui oblige un certain format
  constructor(private authService : AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ):Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isAuth){
        return true;
      }else{
        this.router.navigate( ['/auth'] );
      }
    }

}

