import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { servicesModel } from 'src/app/models/services/servicesModel';
import { AlertService } from 'src/app/services/alert/alert.service';
import { serviceService } from 'src/app/services/service/service.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit, OnDestroy{

  services?: servicesModel[];
  subscription: Subscription[] = [];
  serviceForm: FormGroup;
  user_id: string | null = localStorage.getItem("user_id");
  updateState: boolean = false;

  constructor(
    private modalService: NgbModal,
    private serviceService: serviceService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
      this.serviceForm = this.formBuilder.group({
        id: [],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        createdbyid:[this.user_id]
      })
    }

  ngOnInit(): void {
    this.getAllServices();
  }


  ngOnDestroy(): void{
    this.subscription.forEach(sub =>{
      sub.unsubscribe();
    });
  }

  get controls(){
    return this.serviceForm.controls;
  }

  getAllServices(): void {
    let sub = this.serviceService.getAll().subscribe(services => this.services = services);
    this.subscription.push(sub);

  }

  saveService(): void {
    this.serviceService.saveServices(this.serviceForm.value).subscribe(_ =>{
      this.closeModal();
      this.getAllServices();
      this.alertService.successAlert("El registro se almaceno con exito..!!");
    })
  }

  onUpdateOrSave(content: any, service?: servicesModel): void {
    console.log(service);
    if (service) {
      this.updateState = true;
      this.transformData(service);
    } else {
      this.updateState = false;
      this.serviceForm.reset();
      this.serviceForm.controls['createdbyid'].setValue(this.user_id); 
    }
    this.openModal(content);
  }  

  updateService(): void {
    let service = this.serviceForm.value;
      const sub$ = this.serviceService.updateService(service.id, service).subscribe(
        _ => {
          this.closeModal();
          this.getAllServices();
          this.serviceForm.reset();
          this.updateState = false;
          this.alertService.successAlert("El registro se actualizo con exito..!!");
        })
  }

  deleteService(serviceId?: number) {
    if(serviceId) {
      console.log(serviceId);
      this.serviceService.deleteById(serviceId).subscribe(_ => {
        this.getAllServices();
        this.alertService.successAlert("Se registro se elimino con exito..!!");
      })

    }

  }

  transformData(service: servicesModel): void{
    this.serviceForm.setValue({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      createdbyid: service.createdbyid,
      
    })
  }

  openModal(content: any){
    this.modalService.open(content, {size: 'lg'});
  }

  closeModal(){
    this.modalService.dismissAll();
    this.updateState = false;
  }



}
