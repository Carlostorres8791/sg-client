import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { orderResponse } from 'src/app/models/order/orderResponse';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.sass']
})
export class WorkOrderDetailComponent implements OnInit {

  order?: orderResponse;
  order_id?: string | null;

  constructor( private orderService: OrderService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.order_id = this.route.snapshot.paramMap.get('id');
    this.getById();
  }

  getById(){
    if (this.order_id) {
      this.orderService.getById(Number(this.order_id)).pipe(tap(console.log)).subscribe(value => this.order = value)
    }
  }

}
