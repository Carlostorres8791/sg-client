import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthServiceResponse } from 'src/app/models/auth/auth-interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainService } from 'src/app/services/main/main.service';
import { MainServiceService } from 'src/app/services/mains/main-service.service';
import { MainRouting } from '../../models/main-routing';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  userInfo?: AuthServiceResponse;
  mains?: MainRouting[];

  constructor( 
    private authService: AuthService,
    private mainServie: MainService) {

     }
  
  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.mainServie.getMainsByUserId(this.userInfo?.id).pipe(tap(console.log)).subscribe( mains => this.mains = mains)
  }

}
