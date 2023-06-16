import { Component, OnInit } from '@angular/core';
import { AuthServiceResponse } from 'src/app/models/auth/auth-interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userInfo?: AuthServiceResponse;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

}
