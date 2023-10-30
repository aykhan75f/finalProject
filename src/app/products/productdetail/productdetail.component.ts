import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { products } from '../products.class';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent {
  prodId: number;
  productList: products[];
  selectedprod: products = new products();

  constructor(private apiser: ApiService, private activeRoute: ActivatedRoute,private cartService:CartService) {}

  ngOnInit() {
    this.apiser.getProduct().subscribe((res: products[]) => {
      this.productList = res;
      console.log(this.productList);
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });

      this.activeRoute.params.subscribe((data: Params) => {
        this.prodId = data['id'];
        console.log(this.prodId);
        this.selectedprod = this.productList.find(product => product.id == this.prodId);
      });
    });
  }
  addtocartfromdetails(selectedprod:products){
    this.cartService.addtoCart(selectedprod);
  }
}
