import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
 showSortButtons: boolean = false;
 showFilterButtons: boolean = false;
 selectedRatingFilters: number[] = [];
selectedPriceFilters: { min: number; max: number }[] = [];
  priceSortOrder: 'asc' | 'desc' = 'asc';
  ratingSortOrder: 'asc' | 'desc' = 'asc';
  priceRanges = [
    { min: 5, max: 10, label: 'INR 5-10' },
    { min: 10, max: 50, label: 'INR 10-50' },
    { min: 50, max: 100, label: 'INR 50-100' },
    { min: 100, max: 200, label: 'INR 100-200' },
    { min: 400, max: 1000, label: 'INR 400-1000' }
  ];
  constructor(private api : ApiService, private cartService : CartService,private toastr: ToastrService) { }

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
    this.showSuccess()
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
  showSuccess() {
    this.toastr.info('Item added to cart');
  }
  sortProducts(property: string, order: 'asc' | 'desc') {
    this.filterCategory.sort((a: any, b: any) => {
        const aValue = this.getNestedPropertyValue(a, property);
        console.log(aValue);
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
    console.log(keys);
    let value = obj;

    for (const key of keys) {
        value = value[key];
    }

    return value;
}
applyRatingFilter(min: number) {
  if (this.selectedRatingFilters.includes(min)) {
      this.selectedRatingFilters = this.selectedRatingFilters.filter((val) => val !== min);
  } else {
      this.selectedRatingFilters.push(min);
  }

  this.filterProducts();
}


applyPriceFilter(min: number, max: number) {
  const filter = { min, max };

  if (this.isPriceFilterSelected(filter)) {
    this.selectedPriceFilters = this.selectedPriceFilters.filter((val) => val.min !== filter.min || val.max !== filter.max);
  } else {
    this.selectedPriceFilters.push(filter);
  }

  this.filterProducts();
}

filterProducts() {
  let filteredProducts = this.productList;
  if (this.selectedRatingFilters.length > 0) {
    filteredProducts = filteredProducts.filter((product: any) => {
      return this.selectedRatingFilters.includes(Math.floor(product.rating.rate));
    });
  }

  if (this.selectedPriceFilters.length > 0) {
    filteredProducts = filteredProducts.filter((product: any) => {
      // Check if the product price is within any of the selected price filters
      return this.selectedPriceFilters.some(filter => product.price >= filter.min && product.price <= filter.max);
    });
  }

  if (this.selectedRatingFilters.length === 0 && this.selectedPriceFilters.length === 0) {
    // No filters selected then show all products
    this.filterCategory = this.productList;
  } else {
    this.filterCategory = filteredProducts;
  }
}

isPriceFilterSelected(filter: { min: number; max: number }): boolean {
  return this.selectedPriceFilters.some((f) => f.min === filter.min && f.max === filter.max);
}



}
