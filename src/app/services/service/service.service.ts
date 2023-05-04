import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { servicesModel } from 'src/app/models/services/servicesModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class serviceService {
  static id: any;
  
  private uri: string;

  constructor(private http : HttpClient) {
    this.uri = environment.url + 'services/'
   }

   updateService(id: any, service: any):Observable<any> {
    return this.http.put<any>(this.uri + id, service);
  }

   saveServices(servicesModel: servicesModel):Observable<any>{ 
    return this.http.post<any>(this.uri , servicesModel);
   } 

   getAll(): Observable<servicesModel[]> {
    return this.http.get<servicesModel[]>(this.uri);
   }

   deleteById(serviceId: number): Observable<any> {
    return this.http.delete<any>(this.uri + serviceId)
   }

}
