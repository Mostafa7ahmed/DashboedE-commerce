import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './Core/Guards/auth.guard';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProductsComponent } from './Components/ProdcutsAll/products/products.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { AddProductComponent } from './Components/ProdcutsAll/add-product/add-product.component';
import { DepartComponent } from './Components/DepartmentAll/depart/depart.component';
import { AdddepartComponent } from './Components/DepartmentAll/adddepart/adddepart.component';
import { EditProductComponent } from './Components/ProdcutsAll/edit-product/edit-product.component';
import { EditdepartmentComponent } from './Components/DepartmentAll/editdepartment/editdepartment.component';
import { MessageComponent } from './Components/message/message.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashbords', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashbords',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashbord', component: DashboardComponent },
      { path: 'order', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'AddProduct', component: AddProductComponent },
      { path: 'depart', component: DepartComponent },
      { path: 'addDepart', component: AdddepartComponent },
      { path: 'products/edit/:id', component: EditProductComponent }, 
      { path: 'depart/edit/:id', component: EditdepartmentComponent },

      { path: 'message', component: MessageComponent },


      { path: '**', component: NotfoundComponent }


    ],
  },
  // Handle 404 for all routes under dashbords
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
