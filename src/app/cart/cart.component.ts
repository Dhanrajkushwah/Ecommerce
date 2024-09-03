import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../shop/shop.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: Product[] = [];
  subtotal: number = 0;
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();
  constructor(private cartService: CartService) { 
    this.cartService.cart$.subscribe(items => this.cartItems = items);
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.updateSubtotal();
    });
  }
  
  updateSubtotal(): void {
    this.subtotal = this.cartService.getSubtotal();
  }

  increaseQuantity(item: Product): void {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: Product): void {
    this.cartService.decreaseQuantity(item);
  }

  addToCart(item: Product): void {
    this.cartService.addToCart(item);
  }
}

