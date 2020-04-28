import { Component } from '@angular/core';
import { IProduct } from './product';
import { OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Attributs
  pageTitle: string = 'Product List';
  imageWidth : number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filteredProducts: IProduct[];
  products: IProduct[] = [];

  // Méthodes
  // pas de mot clé () : return type 
  constructor(private productService: ProductService) {
    // Initialisation des attributs
    this.listFilter = '';
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log('In OnInit');
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);       
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }


}


