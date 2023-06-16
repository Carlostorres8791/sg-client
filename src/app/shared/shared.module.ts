import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { ToggleSidebarDirective } from './directives/toggle-sidebar.directive';
import { SearchPipe } from './pipes/search.pipe';
import { StatusOrderDirective } from './directives/status-order.directive';
import { OrderSearchPipe } from './pipes/order-search.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ActiveLinkDirective,
    ToggleSidebarDirective,
    SearchPipe,
    StatusOrderDirective,
    OrderSearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    SearchPipe,
    OrderSearchPipe,
    StatusOrderDirective,
    ActiveLinkDirective,
    ToggleSidebarDirective,
  ]
})
export class SharedModule { }
