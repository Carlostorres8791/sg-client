import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CvComponent } from './cv/cv.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { TechnicianListComponent } from './technician/technician-list/technician-list.component';
import { TechniciansComponent } from './technician/technicians/technicians.component';
import { UsersComponent } from './users/users.component';
import { WorkOrderCreateComponent } from './work-order/work-order-create/work-order-create.component';
import { WorkOrderDetailComponent } from './work-order/work-order-detail/work-order-detail.component';
import { WorkOrderListComponent } from './work-order/work-order-list/work-order-list.component';
import { WorkOrderComponent } from './work-order/work-order.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "vehicles", component: VehiclesComponent },
  { path: "services", component: ServicesComponent },
  { path: "products", component: ProductsComponent },
  { path: "technicians", component: TechniciansComponent },
  { path: "technicians/list", component: TechnicianListComponent },
  { path: "clients", component: ClientsComponent },
  { path: 'work-order' , component: WorkOrderComponent, 
    children: [
      { path: "list", component: WorkOrderListComponent },
      { path: "create", component: WorkOrderCreateComponent },
      { path: "detail/:id", component: WorkOrderDetailComponent },
    ]
  },
  { path: "cv", component: CvComponent },
  { path: "users", component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullRoutingModule { }
