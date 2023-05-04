import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.sass']
})
export class RecoverComponent implements OnDestroy {

  recoverForm: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.recoverForm = this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get controls() {
    return this.recoverForm.controls;
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    Swal.fire('success')
    const sub$ = this.authService.recoverPassword(this.recoverForm.value).subscribe( _ => {
      Swal.close();
      this.router.navigate(['/content/validate-code/edwarerazo'])
    }
    )
    this.subscriptions.push(sub$);
  }

}
