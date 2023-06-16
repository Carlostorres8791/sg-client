import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [
  ]
})
export class ContentComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/full/home"])
    }
  }

}
