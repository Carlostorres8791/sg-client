import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnDestroy {

  LoginForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.LoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get controls() {
    return this.LoginForm.controls;
  }

  onSubmit(): void {
    const sub$ = this.authService.login(this.LoginForm.value).subscribe(
      {
        next: (_) => {
          this.router.navigate(['/full/home'])
        },
        error: (err: Error) => {
          this.alertService.errorAlert("Usuario o contraseña erroneos..!!")
        }
      }
    )
    this.subscriptions.push(sub$);
  }

}
