import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm!: string;

  constructor(private cartService: CartService) { }

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
}
