import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthInterface, AuthServiceResponse, recoverPassword } from 'src/app/models/auth/auth-interface';
import { MainRouting } from 'src/app/shared/models/main-routing';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode'
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri: string;
  private name_key_token: string = 'auth-token';
  private name_key_user: string = 'user-info';
  private userInfo?: AuthServiceResponse;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService) {
    this.uri = environment.url + 'auth/';
  }

  login(data: AuthInterface): Observable<AuthServiceResponse> {
    return this.http.post<AuthServiceResponse>(this.uri + 'login', data)
      .pipe(
        tap((value) => {
          this.setToken(value.auth_token);
          this.setUserInfo(value)
        })
      );
  }

  recoverPassword(recoverPassword: recoverPassword): Observable<any> {
      return this.http.post<any>(this.uri + 'recover-password', recoverPassword);
  }


  getToken(): string | null {
    let token: string | null = localStorage.getItem(this.name_key_token);
    return token ? token : null;
  }

  getUserInfo(): AuthServiceResponse {
    let data: string | null = localStorage.getItem(this.name_key_user);
    let user_info: AuthServiceResponse = JSON.parse((data)? data : '');
    this.userInfo = user_info;
    return this.userInfo;
  }

  getMains(): MainRouting[] | undefined {
    let mains: MainRouting[] | undefined;
    if (!this.userInfo) {
      mains = this.getUserInfo().roles.mains;
      return mains;
    } else {
      mains = this.userInfo.roles.mains;
      return mains;
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.name_key_token,token);
  }

  private setUserInfo(data: AuthServiceResponse) {
    localStorage.setItem(this.name_key_user,JSON.stringify(data));
    localStorage.setItem("user_id", "" + data.id )
  }


  isAuthenticated() {
    let data_token = localStorage.getItem('auth-token');
    if (data_token) {
      let user_info = JSON.stringify(data_token).split(";");
      let access_token = user_info[0].replace("\"Bearer=","");
      let payload: any = decode(access_token)
      let expire = new Date(payload.exp * 1000);
      let hoy = new Date()
      if (hoy > expire) {
        this.logout();
        return false
      }
      return true
    } else {
      this.logout();
      return false;
    }

  }

  logout() { 
    //this.alertService.errorAlert("Por favor inicie sesión..!")
    localStorage.clear();
    this.router.navigate(['/content/login']);
  }

}
