import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderModel } from 'src/app/models/order/orderModel';
import { orderResponse } from 'src/app/models/order/orderResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = environment.url + "orders/"
  }

  save(orderModel: orderModel): Observable<any> {
    return this.http.post<any>(this.uri, orderModel);
  }

  getAll(): Observable<orderResponse[]> {
    return this.http.get<orderResponse[]>(this.uri);
  }

  deleteById(orderId: number): Observable<any> {
    return this.http.delete<any>(this.uri + orderId);
  }

  getById(orderId: number): Observable<orderResponse> {
    return this.http.get<orderResponse>(this.uri + orderId);
  }



}


