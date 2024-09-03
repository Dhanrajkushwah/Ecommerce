import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../shop/shop.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  cartItems: any[] = []; // Array to hold cart items
  filteredProducts: Product[] = [];
  images: any;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
  toggleWishlist(productId: number): void {
    if (this.cartService.isInWishlist(productId)) {
      this.cartService.removeFromWishlist(productId);
    } else {
      this.cartService.addToWishlist(productId);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.cartService.isInWishlist(productId);
  }
}
