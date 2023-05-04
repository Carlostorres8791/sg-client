import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { clientModel } from 'src/app/models/client/clientModel';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit, OnDestroy {

  clients: clientModel[] = [];
  subscription: Subscription [] = [];
  clientForm: FormGroup;
  updateState: boolean = false;

  searchForm: FormControl = new FormControl();

  @ViewChild('content') modal!: ElementRef;

  constructor(
    private modalService: NgbModal,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
      this.clientForm = this.buildForm();
    }

  ngOnInit(): void {
    //this.getAllUsers();
  }

  onPush(clients: clientModel[]) {
    this.clients = clients;
  }

  ngOnDestroy():void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });

  }

  buildForm(): FormGroup{
    return this.formBuilder.group({
      id: [],
      pname: ['', Validators.required],
      sname: ['', Validators.required],
      plastname: ['', Validators.required],
      slastname: ['', Validators.required],
      cedula: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    })
  }

  get controls() {
    return this.clientForm.controls;
  }

  getAllUsers(): void{
    let sub =  this.clientService.getAll().subscribe(clients => this.clients = clients);
    this.subscription.push(sub);
  } 

  saveClient(): void {
    this.clientService.saveClient(this.clientForm.value).subscribe(_ =>{
      this.closeModal();
      this.getAllUsers();
      this.clientForm.reset();
      this.alertService.successAlert("El registro se almaceno con exito..!!");
    })
  }

  onUpdateOrSave(content: any, client?: clientModel): void {
    if(client){
      this.updateState = true;
      this.transformData(client);
    }else{
      this.updateState = false;
    }
    this.openModal(content);
  }

  updateClient(): void {
    let client = this.clientForm.value;
    const sub$ = this.clientService.updateClient(client.id, client).subscribe(_ => {
      this.closeModal();
      this.getAllUsers();
      this.clientForm.reset();
      this.updateState = false;
      this.alertService.successAlert("El registro se actualizo con exito..!!");
    })
  }

  deleteClient (clientId?: number) {
    if (clientId) {
      this.clientService.deleteById(clientId).subscribe(_ => {
        this.getAllUsers();
        this.alertService.successAlert("El registro se elimino con exito..!!");
      })      
    }
  }

  transformData(client: clientModel): void {
    this.clientForm.setValue({
      id: client.id,
      pname: client.pname,
      sname:client.sname,
      plastname: client.plastname,
      slastname: client.slastname,
      cedula: client.cedula,
      phone: client.phone,
      email: client.email,
      address: client.address,
    })
  }
  
  openModal(content: any){
    this.modalService.open(content, {size: "lg"});
  }

  closeModal() {
    this.modalService.dismissAll();
    this.updateState = false;
  }
}
