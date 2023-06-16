import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productModel } from 'src/app/models/product/productModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private uri: string;

  constructor(private http : HttpClient) {
    this.uri = environment.url + 'product/'
   }

   saveProduct(productModel: productModel):Observable<any>{ 
    return this.http.post<any>(this.uri , productModel);
   } 

   updateProduct(productId: number, productModel: productModel):Observable<any>{ 
    return this.http.put<any>(this.uri + productId , productModel);
   }

   getAll(): Observable<productModel[]> {
    return this.http.get<productModel[]>(this.uri);
   }

   deleteById(productId: number): Observable<any> {
    return this.http.delete<any>(this.uri + productId)
   }

}
