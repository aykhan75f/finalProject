import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { FilterPipe } from './shared/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    HeaderComponent,
    ProductsComponent,
    FilterPipe,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
