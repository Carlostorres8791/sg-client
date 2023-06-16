import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullRoutingModule } from './full-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NgChartsModule } from 'ng2-charts';
import { CountsReportComponent } from './home/counts-report/counts-report.component';
import { TodayReportComponent } from './home/today-report/today-report.component';
import { ServicesReportComponent } from './home/services-report/services-report.component';
import { ProductReportComponent } from './home/product-report/product-report.component';
import { OrderReportComponent } from './home/order-report/order-report.component';
import { MonthReportComponent } from './home/month-report/month-report.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { CvComponent } from './cv/cv.component';
import { TechnicianListComponent } from './technician/technician-list/technician-list.component';
import { TechniciansComponent } from './technician/technicians/technicians.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkOrderCreateComponent } from './work-order/work-order-create/work-order-create.component';
import { WorkOrderListComponent } from './work-order/work-order-list/work-order-list.component';
import { WorkOrderDetailComponent } from './work-order/work-order-detail/work-order-detail.component';
import { CvDetailsComponent } from './cv/cv-details/cv-details.component';
import { CvListComponent } from './cv/cv-list/cv-list.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ClientsCreateComponent } from './clients/clients-create/clients-create.component';
import { VehiclesCreateComponent } from './vehicles/vehicles-create/vehicles-create.component';
import { TechnicianCreateComponent } from './technician/technician-create/technician-create.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    VehiclesComponent,
    CountsReportComponent,
    TodayReportComponent,
    ServicesReportComponent,
    ProductReportComponent,
    OrderReportComponent,
    MonthReportComponent,
    ServicesComponent,
    ProductsComponent,
    TechniciansComponent,
    ClientsComponent,
    CvComponent,
    TechnicianListComponent,
    UsersComponent,
    WorkOrderComponent,
    WorkOrderCreateComponent,
    WorkOrderListComponent,
    WorkOrderDetailComponent,
    CvDetailsComponent,
    CvListComponent,
    ClientsCreateComponent,
    VehiclesCreateComponent,
    TechnicianCreateComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FullRoutingModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FullModule { }
