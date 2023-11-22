import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-headercart',
  templateUrl: './headercart.component.html',
  styleUrls: ['./headercart.component.css'],
})
export class HeadercartComponent {
  public totalItem: number = 0;
  public searchTerm!: string;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = JSON.parse(sessionStorage.getItem('cartList')).length;
    });
  }
}
