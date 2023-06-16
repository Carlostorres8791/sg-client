import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { clientModel } from 'src/app/models/client/clientModel';
import { ClientService } from 'src/app/services/client/client.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { vehicleModel } from 'src/app/models/vehicle/vehicleModel';
import { userModel } from 'src/app/models/users/userModel';
import { UserService } from 'src/app/services/user/user.service';
import { orderModel } from 'src/app/models/order/orderModel';
import { OrderService } from 'src/app/services/order/order.service';
import { AlertService } from 'src/app/services/alert/alert.service';



@Component({
  selector: 'app-work-order-create',
  templateUrl: './work-order-create.component.html',
  styleUrls: ['./work-order-create.component.sass']
})
export class WorkOrderCreateComponent implements OnInit, OnDestroy {

  user_id: string | null = localStorage.getItem("user_id");
  clients: clientModel[] = [];
  vehicles?: vehicleModel;
  technicians?: userModel[];
  subscription: Subscription[] = [];

  ordersForm: FormGroup;

  updateState: boolean = false;
  searchClientform: FormControl = new FormControl();
  searchVehicleform: FormControl = new FormControl();
  searchTechnicianform: FormControl = new FormControl();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private technicianService: UserService,
    private orderService: OrderService,
    private alertService: AlertService) {
    this.ordersForm = this.buildForm();
  }

  ngOnInit(): void {
    this.getAllTechinicans();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getByCedulaOrNames(value: string): void {
    let sub = this.clientService.getByCedulaOrNames(value).subscribe(clients => this.clients = clients);
    this.subscription.push(sub);
  }

  getByPlaca(value: string): void {
    let sub = this.vehicleService.getByPlaca(value).subscribe(vehicles => this.vehicles = vehicles);
  }

  getAllTechinicans() {
    let sub$ = this.technicianService.getAllByRole(3).subscribe(tec => this.technicians = tec)
    this.subscription.push(sub$);
  }

  getByIdTechnician(value: string): void {
    let sub = this.technicianService.getByTechnician(value).subscribe(technician => this.technicians = technician);
  }

  onSelectClient(client: clientModel) {
    console.log(client)
    this.modalService.dismissAll();
    this.ordersForm.controls['client'].setValue(client);
  }

  onSelectVehicle(vehicle: vehicleModel) {
    console.log(vehicle)
    this.modalService.dismissAll();
    this.ordersForm.controls['vehicle'].setValue(vehicle);
  }

  onSelectTechnician(technician: userModel) {
    console.log(technician)
    this.modalService.dismissAll();
    this.ordersForm.controls['technician.id'].setValue(technician.id);
    this.ordersForm.controls['technician.technician'].setValue(technician.name);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [],
      client: this.formBuilder.group({
        id: [],
        pname: [{ value: '', disabled: true }, Validators.required],
        sname: [{ value: '', disabled: true }, Validators.required],
        plastname: [{ value: '', disabled: true }, Validators.required],
        slastname: [{ value: '', disabled: true }, Validators.required],
        cedula: [{ value: '', disabled: true }, Validators.required],
        phone: [{ value: '', disabled: true }, Validators.required],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        address: [{ value: '', disabled: true }, Validators.required]
      }, [Validators.required]),
      vehicle: this.formBuilder.group({
        id: [],
        brand: [{ value: '', disabled: true }, Validators.required],
        reference: [{ value: '', disabled: true }, Validators.required],
        placa: [{ value: '', disabled: true }, Validators.required],
        color: [{ value: '', disabled: true }, Validators.required],
        createdbyid: [{ value: '', disabled: true }, Validators.required],
        createdat: [''],
        updatedat: ['']
      }, [Validators.required]),
      technician: this.formBuilder.group({
        id: [],
        technician: [{ value: '', disabled: true }, Validators.required]
      }),
      description: [],
    })
  }

  save(): void {
    let ux = this.ordersForm.value;
    console.log(ux);

  }

  onPushClient(client: clientModel) {
    this.ordersForm.controls['client'].setValue(client);
  }

  onPushVehicle(vehicle: vehicleModel) {
    this.ordersForm.controls['vehicle'].setValue(vehicle);
  }

  onPushTechnician(technician: userModel) {
    this.ordersForm.controls['technician'].setValue({ id: technician.id, technician: technician.name });
  }

  onPressTech(event: any) {
    this.getByIdTechnician(this.searchTechnicianform.value);
  }

  onPressClient(event: any) {
    this.getByCedulaOrNames(this.searchClientform.value);
  }

  onPressVehicle(event: any) {
    this.getByPlaca(this.searchVehicleform.value);
  }

  setClient() {
    this.ordersForm.controls['client']
  }

  openModal(modal: TemplateRef<NgbModalRef>) {
    this.modalService.open(modal, { size: 'lg' });
  }


  onSubmit() {
    console.log(this.ordersForm.value)
    if (this.user_id) {
      let order: orderModel = {
        client_id: this.ordersForm.value.client.id,
        vehicle_id: this.ordersForm.value.vehicle.id,
        technical_id: this.ordersForm.value.technician.id,
        createdbyid: this.user_id,
        description: this.ordersForm.value.description,
        status: 3
      }
      this.orderService.save(order).subscribe(value => {
        this.searchClientform.reset;
        this.searchVehicleform.reset;
        this.searchTechnicianform.reset;
        this.ordersForm.reset; 
        this.alertService.successAlert("El registro se guardo con exito..!!")
      });
    }
   
  }


}
