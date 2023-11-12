import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });

    cartService = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('should get products as an observable', (done) => {
    cartService.getProducts().subscribe((products) => {
      expect(products).toEqual([]);
      done();
    });
  });

  it('should add a product to the cart', () => {
    const product = { id: 2, name: 'Another Product', total: 20 };
    cartService.addtoCart(product);

    cartService.getProducts().subscribe((products) => {
      expect(products).toContain(product);
    });
  });

  it('should calculate the total price', () => {
    const products = [
      { id: 3, name: 'Product 1', total: 30 },
      { id: 4, name: 'Product 2', total: 40 },
    ];

    products.forEach((product) => cartService.addtoCart(product));

    const totalPrice = cartService.getTotalPrice();
    expect(totalPrice).toBe(70);
  });

  it('should remove a specific item from the cart', () => {
    const productToRemove = { id: 3, name: 'Product 1', total: 30 };

    cartService.addtoCart(productToRemove);
    const productToKeep = { id: 4, name: 'Product 2', total: 40 };
    cartService.addtoCart(productToKeep);

    cartService.removeCartItem(productToRemove);

    cartService.getProducts().subscribe((products) => {
      expect(products).not.toContain(productToRemove);
      expect(products).toContain(productToKeep);
    });
  });

  it('should remove all items from the cart', () => {
    const products = [
      { id: 5, name: 'Product 3', total: 50 },
      { id: 6, name: 'Product 4', total: 60 },
    ];

    products.forEach((product) => cartService.addtoCart(product));

    cartService.removeAllCart();

    cartService.getProducts().subscribe((products) => {
      expect(products).toEqual([]);
    });
  });
});
