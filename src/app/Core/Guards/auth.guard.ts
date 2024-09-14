import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  constructor(private _AuthService:AuthService , private _Router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._AuthService.userInfo.getValue() != null) {

      
      
      return true;
    }
    
    else {
      this._Router.navigate(['/login'])
      return false;
     }
  }
}
