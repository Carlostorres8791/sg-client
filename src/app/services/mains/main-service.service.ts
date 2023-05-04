import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainRouting } from 'src/app/shared/models/main-routing';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private url: string = 'http://localhost:8080/mains';

  constructor( private http: HttpClient) { }

  getAll(): Observable<MainRouting[]> {
    return this.http.get<MainRouting[]>(this.url, { withCredentials: true });
  }

  getMainsByUserId(userId: string): Observable<MainRouting[]> {
    return this.http.get<MainRouting[]>(this.url + userId);
  }
  
}
