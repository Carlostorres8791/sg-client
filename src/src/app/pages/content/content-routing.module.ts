import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { SignupComponent } from './signup/signup.component';
import { ValidateCodeComponent } from './validate-code/validate-code.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "recover", component: RecoverComponent},
  {path: "validate-code/:username", component: ValidateCodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
