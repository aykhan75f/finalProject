import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { authguardGuard } from './auth/authguard.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductdetailComponent } from './products/productdetail/productdetail.component';

const routes: Routes = [
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:"products", component:ProductsComponent,canActivate:[authguardGuard]},
  {path:"cart", component: CartComponent,canActivate:[authguardGuard]},
  {path:"notfound",component:NotfoundComponent},
  {path:"products/product/:id",component:ProductdetailComponent,canActivate:[authguardGuard]},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
