import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductResolved } from './product';
import { ProductResolver } from './product-resolver.service';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,
              private route:ActivatedRoute) { 

              }

  ngOnInit():void{
    /*
    const id= +this.route.snapshot.paramMap.get('id');    
     */
    /* this.route.paramMap.subscribe(param=>{const id=param.get('id')}) //can observable
    
    this.getProduct(id); */
    // either we can use above method to fet the data or route-resolver,
    // routes loads the page only when data is ready from resolver
    const resolvedData:ProductResolved=this.route.snapshot.data['resolvedData'];
    this.errorMessage=resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  getProduct(id: number): void {    
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}