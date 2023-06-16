import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientModel } from "src/app/models/client/clientModel";
import { userModel } from 'src/app/models/users/userModel';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private uri: string;

  constructor(private http: HttpClient) { 
    this.uri = environment.url + 'clients/'
  }

  saveClient(clientModel: clientModel):Observable<any>{
    return this.http.post<any>(this.uri, clientModel)
  }

  updateClient(clientId: number, userModel: userModel):Observable<any>{
    return this.http.put<any>(this.uri + clientId, userModel);
  }

  getAll():Observable<clientModel[]> {
    return this.http.get<clientModel[]>(this.uri);
  }

  getByCedulaOrNames(value: string):Observable<clientModel[]> {
    return this.http.get<clientModel[]>(this.uri + 'search/' + value);
  }

  deleteById(clientId: number): Observable<any> {
    return this.http.delete<any>(this.uri + clientId);
  }
}
