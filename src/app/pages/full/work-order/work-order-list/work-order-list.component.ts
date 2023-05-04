import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { orderResponse } from 'src/app/models/order/orderResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.sass']
})
export class WorkOrderListComponent implements OnInit {

  order?: orderResponse [];
  orderId?: orderResponse[];
  subscription: Subscription[] = [];
  orderForm: FormGroup;
  updateState: boolean = false;

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
      this.orderForm = this.buildForm();
    }

  ngOnInit(): void {
    this.getAllOrders();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [],
      client: this.formBuilder.group({
        id: [],
        pname: [{ value: '', disabled: true }, Validators.required],
        plastname: [{ value: '', disabled: true }, Validators.required],
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
      }, [Validators.required]),
      technician: this.formBuilder.group({
        id: [],
        technician: [{ value: '', disabled: true }, Validators.required]
      }),
      createdat: [''],
      description: [],
    })

  }

  getAllOrders(): void {
    let sub = this.orderService.getAll().subscribe(orders => this.order = orders);
    this.subscription.push(sub);
  }

  deleteOrder(orderId?: number) {
    if(orderId){
      this.orderService.deleteById(orderId).subscribe(_ => {
        this.getAllOrders();
        this.alertService.successAlert("El registro se elimino con exito..!!");
      })
    }
  }


}
