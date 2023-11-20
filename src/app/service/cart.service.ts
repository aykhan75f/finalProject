import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private zone:NgZone,private router:Router) { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    sessionStorage.setItem('cartList',JSON.stringify(this.cartItemList));
    sessionStorage.setItem('length',this.cartItemList.length);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    var a = confirm("Are you sure you want to delete this item,since the deletion operation cannot be undone!!");
    if (a){
    const index = this.cartItemList.findIndex((a: any) => product.id === a.id);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next([...this.cartItemList]);
      sessionStorage.setItem('cartList', JSON.stringify(this.cartItemList));
      let a = Number(sessionStorage.getItem('length'));
      let b:any = a-1;
      sessionStorage.setItem('length',b);
      this.getTotalPrice();
      console.log(this.cartItemList);
      this.zone.run(() => {});
      this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cart']);
    }); 
    }
    }
    else{
      this.router.navigate(['/cart'])
    }
  }
  removeAllCart(){
    var a = confirm("Are you sure you want to delete this item,since the deletion operation cannot be undone!!");
    if (a)
    {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    sessionStorage.removeItem('cartList');
    sessionStorage.removeItem('length');
    this.router.navigate(['/products'])
    this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cart']);
    }); 
    }
    else{
      this.router.navigate(['/cart'])
    }
    
  }

}