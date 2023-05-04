import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss']
})
export class ValidateCodeComponent implements OnInit, OnDestroy {

  validateForm: FormGroup;
  subscriptions: Subscription[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.validateForm = this.buildForm();
  }

  ngOnInit(): void {
    this.validateForm.controls['username'].setValue(this.route.snapshot.paramMap.get('username'))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get controls() {
    return this.validateForm.controls;
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      username: [{value: '', disabled: true}],
      code: []
    })
  }

  onSubmit(): void {
    const sub$ = this.authService.recoverPassword(this.validateForm.value).subscribe(
      
    )
    this.subscriptions.push(sub$);
  }

}
