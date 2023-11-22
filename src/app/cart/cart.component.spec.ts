import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../service/cart.service';
import { of } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { HeadercartComponent } from '../headercart/headercart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'getProducts',
      'removeCartItem',
      'removeAllCart',
      'getTotalPrice',
    ]);

    TestBed.configureTestingModule({
      declarations: [CartComponent, HeadercartComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit and set products and grandTotal', () => {
    const mockProducts = [
      {
        title: 'Product 1',
        image: 'image1.jpg',
        description: 'Description 1',
        price: 10,
        quantity: 2,
        total: 20,
      },
      {
        title: 'Product 2',
        image: 'image2.jpg',
        description: 'Description 2',
        price: 15,
        quantity: 3,
        total: 45,
      },
    ];

    const mockGrandTotal = 65;

    cartService.getProducts.and.returnValue(of(mockProducts));
    cartService.getTotalPrice.and.returnValue(mockGrandTotal);

    component.ngOnInit();

    expect(cartService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.grandTotal).toEqual(mockGrandTotal);
  });

  it('should call removeCartItem on removeItem', () => {
    const mockProduct = {
      title: 'Product 1',
      image: 'image1.jpg',
      description: 'Description 1',
      price: 10,
      quantity: 2,
      total: 20,
    };

    component.removeItem(mockProduct);

    expect(cartService.removeCartItem).toHaveBeenCalledWith(mockProduct);
  });

  it('should call removeAllCart on emptycart', () => {
    component.emptycart();

    expect(cartService.removeAllCart).toHaveBeenCalled();
  });
});
