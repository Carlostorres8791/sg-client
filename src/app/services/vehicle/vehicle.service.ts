import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle/vehicleModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = environment.url + 'vehicle/'
  }

  saveVehicle(vehicleModel: vehicleModel):Observable<any>{
    return this.http.post<any>(this.uri, vehicleModel)
  }

  updateVehicle(vehicleId: number, vehicleModel: vehicleModel):Observable<any>{
    return this.http.put<any>(this.uri + vehicleId, vehicleModel);
  }

  getAll():Observable<vehicleModel[]> {
    return this.http.get<vehicleModel[]>(this.uri);
  }

  getByPlaca(value: string):Observable<vehicleModel> {
    return this.http.get<vehicleModel>(this.uri + 'placa/' + value);
  }

  deleteById(vehicleId: number): Observable<any> {
    return this.http.delete<any>(this.uri + vehicleId);
  }
}
