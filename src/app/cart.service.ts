import { Injectable } from '@angular/core';
import { Product } from './shop/shop.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  private wishlist: Set<number> = new Set();
  cart$ = this.cartSubject.asObservable();

  constructor(private _http: HttpClient) {
    // Load wishlist from local storage if available
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist = new Set(JSON.parse(savedWishlist));
    }
  }

  // Register User
  signup(obj: any): Observable<any> {
    return this._http.post<any>(`$/api/user/signup`, obj);
    // return this._http.post<any>(`${environment._api}/api/user/signup`, obj);
  }

  // Login User
  login(obj: any): Observable<any> {
    return this._http.post<any>(`$/api/user/login`, obj);
  }
  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(p => p.sku === product.sku);

    if (existingProduct) {
      // Increase quantity if product already in cart
      existingProduct.quantity += product.quantity;
    } else {
      // Add new product to cart
      this.cartItems.push(product);
    }

    this.cartSubject.next(this.cartItems);
  }

  increaseQuantity(product: Product) {
    const cartProduct = this.cartItems.find(p => p.sku === product.sku);
    if (cartProduct) {
      cartProduct.quantity++;
      this.cartSubject.next(this.cartItems);
    }
  }

  decreaseQuantity(product: Product) {
    const cartProduct = this.cartItems.find(p => p.sku === product.sku);
    if (cartProduct && cartProduct.quantity > 1) {
      cartProduct.quantity--;
      this.cartSubject.next(this.cartItems);
    }
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  addToWishlist(productId: number): void {
    this.wishlist.add(productId);
    this.saveWishlist();
  }

  removeFromWishlist(productId: number): void {
    this.wishlist.delete(productId);
    this.saveWishlist();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.has(productId);
  }

  private saveWishlist(): void {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }
}
