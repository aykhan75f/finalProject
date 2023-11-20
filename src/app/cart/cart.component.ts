import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public products : any = [];
  public grandTotal !: number;
  public cartItemsString = sessionStorage.getItem('cartList');
  public cartItems = JSON.parse(this.cartItemsString);
  public total:any;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    if (this.cartItems) {
      this.products = this.cartItems;
    } else {
      this.cartService.getProducts()
        .subscribe(res => {
          this.products = res;
          this.grandTotal = this.cartService.getTotalPrice();
        });
    }
    this.grandTotal = this.cartService.getTotalPrice();
    sessionStorage.setItem('total',this.grandTotal.toString());
    this.total = JSON.parse(sessionStorage.getItem('total'));
  }
  
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}
