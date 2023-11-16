import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-header',
  // providers.
  // view.encapsulation
  // ChangeDetectionStrategy
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm!: string;
  public haveaccess:boolean = true;
  public productList : any ;
  filteredOptions: any[] = [];

  constructor(private cartService: CartService,private loginservice:LoginService,private fireauth:AngularFireAuth,private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;        
      });

    this.cartService.search
      .pipe(debounceTime(2000), distinctUntilChanged()) 
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        console.log(this.searchTerm);
      });
  }

  search(searchTerm: string) {
    this.cartService.search.next(searchTerm);
  }
    filterProducts() {
        // Logic to filter products based on the searchTerm
        this.filteredOptions = this.productList.filter(product =>
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    displayFn(product: any): string {
        return product && product.title ? product.title : '';
    }

    onSelect(event: MatAutocompleteSelectedEvent) {
        // Handle the selection of an autocomplete option
        this.searchTerm = event.option.viewValue;
        this.search(this.searchTerm);
    }
  loggedIn(){
    if (this.haveaccess)
    {
      return true;
    }
    else{
      return false;
    }
  }
  logout() {
    this.haveaccess = false;
    var a = confirm("Are you sure you want you log Out!!!");
    if (a){
      this.fireauth.signOut().then(() => {
        sessionStorage.setItem('isLoggedIn','false');;
        this.router.navigate(['/login']);
        this.showsuccess();
      }).catch((error) => {
        console.log('Error during logout:', error);
      });
    }
    else{
      this.router.navigate(['/products']);
    }
    
  }
  showsuccess(){
    this.toastr.info("Successfully Logged Out")
  }
  
}
