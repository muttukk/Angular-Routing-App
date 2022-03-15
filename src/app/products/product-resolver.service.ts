import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import {ProductResolved} from './product'
import {ProductService} from './product.service'

@Injectable({
    providedIn:'root'
})
export class ProductResolver implements Resolve<ProductResolved>{

constructor(private productService:ProductService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
        const id =route.paramMap.get('id');

        if (isNaN(+id)){
            const message=`Product Id is not found for number:${id}`
            console.error(message);
            return  of({product:null,error:message})
        }
        
        return this.productService.getProduct(+id)
        .pipe(
            map(product=>({product:product})),
            catchError(error =>{
                const errorMessage=`Retrieval Error :${error}`
                console.error(errorMessage);
                return of({product:null,error:errorMessage});
            })
        );
    }
}