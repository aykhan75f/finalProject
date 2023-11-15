import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
        sessionStorage.removeItem('token');
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
