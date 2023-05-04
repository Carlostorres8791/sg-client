import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverComponent } from './recover/recover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateCodeComponent } from './validate-code/validate-code.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    RecoverComponent,
    ValidateCodeComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ContentModule { }
