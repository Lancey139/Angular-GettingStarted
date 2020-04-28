import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'api/products/products.json';

  constructor(private http: HttpClient){

  }
  getProducts():Observable<IProduct[]> {
    // Le mapping sera fait ici de manière automatisée
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }


  private handleError(err: HttpErrorResponse) {
    // Ici à terme, il faut rediriger mes logs vers un serveur remote en charge des logs
    let errorMessage = '';

    if(err.error instanceof ErrorEvent) {
      // Erreur client ou réseau
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else {
      // Backend return unsucceful response code
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}