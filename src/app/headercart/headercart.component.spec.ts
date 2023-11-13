import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadercartComponent } from './headercart.component';
import { CartService } from '../service/cart.service';
import { of } from 'rxjs';

describe('HeadercartComponent', () => {
  let component: HeadercartComponent;
  let fixture: ComponentFixture<HeadercartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getProducts']);

    TestBed.configureTestingModule({
      declarations: [HeadercartComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
    });

    fixture = TestBed.createComponent(HeadercartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set totalItem on ngOnInit', () => {
    const mockProducts = [
      { title: 'Product 1', image: 'image1.jpg', description: 'Description 1', price: 10, quantity: 2, total: 20 },
      { title: 'Product 2', image: 'image2.jpg', description: 'Description 2', price: 15, quantity: 3, total: 45 },
    ];

    cartService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(cartService.getProducts).toHaveBeenCalled();
    expect(component.totalItem).toEqual(mockProducts.length);
  });
});
