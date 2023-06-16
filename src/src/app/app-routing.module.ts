import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layouts/content/content.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: "content",
    component: ContentComponent,
    loadChildren: () => import("./pages/content/content.module").then( m=> m.ContentModule )
  },
  {
    path: "full",
    component: FullComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/full/full.module").then( m => m.FullModule )
  },
  { path: "", redirectTo: "content/login", pathMatch: "full" },
  { path: "**", redirectTo: "content/login", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
