import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle/vehicleModel';
import { AlertService } from 'src/app/services/alert/alert.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-contact',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass']
})
export class VehiclesComponent implements OnInit {

  vehicles: vehicleModel[] = [];
  subcription: Subscription [] = [];
  vehicleForm: FormGroup;
  user_id: string | null = localStorage.getItem("user_id");
  updateState: boolean = false;

  searchForm: FormControl = new FormControl();
  

  constructor(
    private modalService: NgbModal,
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
      this.vehicleForm = this.buildForm();
    }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  ngOnDestroy(): void {
    this.subcription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  
  onPush(vehicles: vehicleModel[]) {
    this.vehicles = vehicles;
  }


  buildForm(): FormGroup{
    return this.formBuilder.group({
      id: [],
      brand: ['', Validators.required],
      reference: ['', Validators.required],
      placa: ['', Validators.required],
      color: ['', Validators.required],
      createdbyid: [this.user_id],
      createdat: [''],
      updatedat: ['']
    })
  }

  get controls() {
    return this.vehicleForm.controls;
  }

  getAllVehicles(): void{
    let sub = this.vehicleService.getAll().subscribe(vehicles => this.vehicles = vehicles);
    this.subcription.push(sub);
  }

  saveVehicle(): void {
    this.vehicleService.saveVehicle(this.vehicleForm.value).subscribe(_ =>{
      this.closeModal();
      this.getAllVehicles();
      this.vehicleForm.reset();
      this.alertService.successAlert("El registro se almaceno con exito..!!");
    })
  }

  onUpdateOrSave(content: any, vehicle?: vehicleModel): void{
    if(vehicle){
      this.updateState = true;
      this.transformData(vehicle);
    }else{
      this.updateState = false;
    }
    this.openModal(content);
  }

  updateVehicle(): void {
    let vehicle = this.vehicleForm.value;
    const sub$ = this.vehicleService.updateVehicle(vehicle.id, vehicle).subscribe(_ => {
      this.closeModal();
      this.getAllVehicles();
      this.vehicleForm.reset();
      this.updateState = false;
      this.alertService.successAlert("El registro se actualizo con exito..!!");
    })
  }

  deleteVehicle (vehicleId?: number) {
    if(vehicleId){
      this.vehicleService.deleteById(vehicleId).subscribe(_=> {
        this.getAllVehicles();
        this.alertService.successAlert("El registro se elimino con exito..!!")
      })
    }
  }

  transformData(vehicle: vehicleModel): void {
    this.vehicleForm.setValue(vehicle)
  }

  openModal(content: any){
    this.modalService.open(content, {size: "lg"});
  }

  closeModal() {
    this.modalService.dismissAll();
    this.updateState = false;
  }

}
