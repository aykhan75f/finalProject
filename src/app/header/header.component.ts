import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  // providers.
  // view.encapsulation
  // ChangeDetectionStrategy
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number;
  public searchTerm!: string;
  public haveaccess: boolean = true;
  public productList: any;
  public productTitles: string[] = [];
  public showAutocomplete: boolean = false;
  filteroptions!: Observable<string[]>;
  formcontrol = new FormControl('');

  constructor(
    private cartService: CartService,
    private loginservice: LoginService,
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private apiser: ApiService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = Number(sessionStorage.getItem('length'));
    });

    this.cartService.search
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
      });
    this.apiser.getProduct().subscribe((res) => {
      this.productList = res;
      this.productTitles = res.map((product: any) => product.title);
    });
    this.filteroptions = this.formcontrol.valueChanges.pipe(
      startWith(''),
      map((value) => this._FILTER(value || ''))
    );
  }

  search(searchTerm: string) {
    this.showAutocomplete = searchTerm.length > 0;
    this.cartService.search.next(searchTerm);
  }
  loggedIn() {
    if (this.haveaccess) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.haveaccess = false;
    var a = confirm('Are you sure you want you log Out!!!');
    if (a) {
      this.fireauth
        .signOut()
        .then(() => {
          sessionStorage.setItem('isLoggedIn', 'false');
          this.router.navigate(['/login']);
          this.showsuccess();
        })
        .catch((error) => {
          console.log('Error during logout:', error);
        });
    } else {
      this.router.navigate(['/products']);
    }
  }
  showsuccess() {
    this.toastr.info('Successfully Logged Out');
  }
  private _FILTER(value: string): string[] {
    const searchvalue = value.toLocaleLowerCase();
    return this.productTitles.filter((option) =>
      option.toLocaleLowerCase().includes(searchvalue)
    );
  }
}
