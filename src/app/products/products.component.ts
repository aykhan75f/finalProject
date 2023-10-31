import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  priceSortOrder: 'asc' | 'desc' = 'asc'; // Initial price sort order
  ratingSortOrder: 'asc' | 'desc' = 'asc';
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
  sortProducts(property: string, order: 'asc' | 'desc') {
    this.filterCategory.sort((a: any, b: any) => {
        const aValue = this.getNestedPropertyValue(a, property);
        const bValue = this.getNestedPropertyValue(b, property);

        if (order === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });

    if (property === 'price') {
        this.priceSortOrder = order;
    } else if (property === 'rating.rate') {
        this.ratingSortOrder = order;
    }
}

private getNestedPropertyValue(obj: any, path: string): any {
    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
        value = value[key];
    }

    return value;
}
}
