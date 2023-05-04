import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainRouting } from 'src/app/shared/models/main-routing';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = environment.url + 'mains/';
  }

  getMainsByUserId(userId: number): Observable<MainRouting[]> {
    return this.http.get<MainRouting[]>(this.uri + userId);
  }

}
