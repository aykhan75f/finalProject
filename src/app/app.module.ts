import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode  } from '@angular/core';
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
import { HoverDirective } from './Directive/hover.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { ProductdetailComponent } from './products/productdetail/productdetail.component';
import { HeadercartComponent } from './headercart/headercart.component';
import { StarRatingModule } from 'angular-star-rating';
import { StarRatingConfigService } from 'angular-star-rating';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    HeaderComponent,
    ProductsComponent,
    FilterPipe,
    NotfoundComponent,
    HoverDirective,
    ProductdetailComponent,
    HeadercartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    StarRatingModule.forRoot(),
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    MatAutocompleteModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [StarRatingConfigService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
 
