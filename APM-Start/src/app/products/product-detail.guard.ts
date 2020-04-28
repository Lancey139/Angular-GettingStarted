import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // On commence oar récupérer l'id qui est l'élément 1 de l'index
      let id= +next.url[1].path;
      if(isNaN(id) || id <1)
      {
        alert("Invalid product id");
        this.router.navigate(['/products']);
        return false
      }
      else
      {
        return true;
      }
  }
  
}
