import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { userModel } from 'src/app/models/users/userModel';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit, OnDestroy {

  users?: userModel[];
  subscription: Subscription[] = [];
  userForm: FormGroup;
  updateState: boolean = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
      this.userForm = this.buildForm();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: [1, [Validators.required, Validators.min(1)]],
      rol_name: []
    })
  }

  get controls() {
    return this.userForm.controls;
  }

  getAllUsers(): void {
    let sub = this.userService.getAll().subscribe(users => this.users = users);
    this.subscription.push(sub);
  }

  saveUser(): void {
    let u=this.userForm.value;
    console.log(u);
    this.userService.saveUser(this.userForm.value).subscribe(_ => {
      this.closeModal();
      this.getAllUsers();
      this.userForm.reset();
      this.alertService.successAlert("El registro se almaceno con exito..!!")
    })
  }

  onUpdateOrSave(content: any, user?: userModel): void {
    if (user) {
      this.updateState = true;
      this.transformData(user);
    } else {
      this.updateState = false;
    }
    this.openModal(content);
  }

  updateUser(): void {
    let user = this.userForm.value;
    console.log(user);
      const sub$ = this.userService.updateeUser(user.id, user).subscribe(
        _ => {
          this.closeModal();
          this.getAllUsers();
          this.userForm.reset();
          this.updateState = false;
          this.alertService.successAlert("El registro se actualizo con exito..!!");
        })
  }

  deleteUser(userId?: number) {
    if (userId) {
      this.userService.deleteById(userId).subscribe(
        _ => {
          this.getAllUsers();
          this.alertService.successAlert("El registro se elimino con exito..!!");
        })
    }
  }

  transformData(user: userModel): void {
    this.userForm.setValue({
      id: user.id,
      name: user.name,
      username: user.username,
      password: '',
      email: user.email,
      rol_id: user.rol_id,
      rol_name: user.rol_name
    })
  }

  openModal(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}

  closeModal() {
    this.modalService.dismissAll();
    this.updateState = false;
  }


}
