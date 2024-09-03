import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

export interface Product {
  id:number;
  imageUrl: string;
  title: string;
  price: number;
  soldOut: boolean;
  category: string; 
  sku: string;
  quantity: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  categories = ['ACCESSORIES', 'DECOR', 'LIFESTYLE', 'MOUNTS', 'POWER', 'SOUND'];
  selectedCategory: string = 'ACCESSORIES'; // Default selected category

  products = [
    // Add a category to each product
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/ffb7005f-de88-4c15-8e14-9cda5e6a44ed_300x.png?v=1686860713', title: 'Merkury Innovations PurAire HEPA Filter Replacement', price: 24.99, soldOut: false, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-199', id: 1},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/416b9b6d-773f-4a9d-a954-edebf5e46c16_300x.jpg?v=1595448136', title: '6 Ft 3-Outlet Power Strip', price: 14.99, soldOut: false, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-200', id: 2},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/060613cf-daa1-478f-92e8-a15c7d29721b_300x.jpg?v=1595278290', title: '6 Ft Lightning Cable', price: 19.99, soldOut: true, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-201',id: 3 },
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-13MM6-101_A_360x.jpg?v=1701897518', title: 'TINT Gradient Case - 12/13 Pro Max', price: 14.99, soldOut: true, category: 'ACCESSORIES',quantity: 1 ,sku: 'MI-LST05-203',id: 4},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-AWB4S-101_A_300x.jpg?v=1701183883', title: 'Apple Watch Band - Perforated Silicone', price: 9.99, soldOut: true, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-204',id: 5},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/ba5eb1c3-1821-44ef-8105-f69704b4d5c1_360x.jpg?v=1595277771', title: 'Airpods Pro Case', price: 9.99, soldOut: true, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-205', id: 6},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-AWB4S-683_A_300x.jpg?v=1701185606', title: 'Apple Watch Band - Perforated Silicone', price: 9.99, soldOut: true, category: 'ACCESSORIES',quantity: 1, sku: 'MI-LST05-206',id: 7},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-14MM6-101_A_300x.jpg?v=1701900674', title: 'TINT Gradient Case - 14 Pro Max', price: 14.99, soldOut: true, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-207' ,id: 8},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-AWB4S-279_A_360x.jpg?v=1701184120', title: 'Apple Watch Band - Perforated Silicone', price: 9.99, soldOut: true, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-207' ,id: 9},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-13P12-407_A_300x.jpg?v=1701897860', title: 'GLAZE Soft Touch Translucent Case-iPhone', price: 14.99, soldOut: true, category: 'ACCESSORIES',quantity: 1,sku: 'MI-LST05-208' ,id: 11},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/f6a19a2f-85f2-484a-b397-361cec674066_c0f29602-ad0b-4caf-bbe0-c2fc6c68edaf_360x.jpg?v=1595277805', title: 'XL Curtain Lights - Warm White', price: 19.99, soldOut: true, category: 'DECOR',quantity: 1,sku: 'MI-LST05-209',id: 12 },
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/d2b512c0-833c-4a95-acf5-4a0a71f77233_360x.jpg?v=1595278042', title: '6.5 FT. Motion Sensor LED Light Strip', price: 12.99, soldOut: true, category: 'DECOR',quantity: 1 ,sku: 'MI-LST05-210',id: 13},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-S196B-199_A_360x.jpg?v=1700149370', title: 'Moonstruck BT Speaker', price: 19.99, soldOut: true, category: 'DECOR',quantity: 1 ,sku: 'MI-LST05-211',id: 14},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-HBF02-136_A_360x.jpg?v=1700079394', title: 'Whirlwind Handheld Bladeless Fan', price: 9.99, soldOut: true, category: 'LIFESTYLE',quantity: 1 ,sku: 'MI-LST05-212',id: 16},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-HBF02-101_A_300x.jpg?v=1700584457', title: 'Whirlwind Handheld Fan - Black', price: 9.99, soldOut: true, category: 'LIFESTYLE',quantity: 1 ,sku: 'MI-LST05-213',id: 17},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-LT101-199_C_300x.jpg?v=1700073963', title: 'Revive-Light Therapy Lamp', price: 34.99, soldOut: true, category: 'LIFESTYLE' ,quantity: 1,sku: 'MI-LST05-214',id: 18},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/bd7cfb7f-a7e2-47fb-b6b8-180b1a1a42e1_360x.jpg?v=1592594751', title: 'Flexible Gooseneck Gravity Car Mount', price: 14.99, soldOut: true, category: 'MOUNTS',quantity: 1,sku: 'MI-LST05-215' ,id: 19},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-UVM80-103_D_300x.jpg?v=1700072354', title: 'Universal Car Air Vent Mount -Black/Gray', price: 14.99, soldOut: true, category: 'MOUNTS' ,quantity: 1,sku: 'MI-LST05-216',id: 20},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/3d7b5d67-15c3-462c-8a60-ab814bbec1fd_351ce64d-8d06-4964-9077-61e8a048d8d2_300x.jpg?v=1595278188', title: '3 in 1 Phone Ring, Stand, Mount', price: 9.99, soldOut: true, category: 'MOUNTS',quantity: 1,sku: 'MI-LST05-217',id: 21 },
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-PSF04-199_B_360x.jpg?v=1700146861', title: '2 AC + 2 USB 2.1A 3 Ft Fabric Power', price: 14.9, soldOut: true, category: 'POWER' ,quantity: 1,sku: 'MI-LST05-218',id: 22},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-WC322-199_A_360x.jpg?v=1700074931', title: '2.1A 2 USB 3 Outlets 800 Joules Wall', price: 14.99, soldOut: true, category: 'POWER' ,quantity: 1,sku: 'MI-LST05-219',id: 23},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-CAU09-380_A_360x.jpg?v=1701289737', title: '2IN1 MICRO/TYPE C CABLE', price: 9.99, soldOut: true, category: 'POWER' ,quantity: 1,sku: 'MI-LST05-220',id: 24},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/products/0b777fcd-fc2b-4ddf-84ab-a0d3a858d643_3c6299d6-0ce7-4bdf-9770-8e152afdd236_300x.jpg?v=1595277927', title: 'AURA True Wireless Earbuds', price: 39.99, soldOut: true, category: 'SOUND',quantity: 1 ,sku: 'MI-LST05-221',id: 24},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-E104T-199_A_300x.jpg?v=1700086044', title: 'Lux TWS Bluetooth Earbuds', price: 15.99, soldOut: true, category: 'SOUND' ,quantity: 1,sku: 'MI-LST05-222',id: 25},
    { imageUrl: '//merkuryinnovations.com/cdn/shop/files/MI-E103T-101_A_300x.jpg?v=1700085620', title: 'TWS Pro Earbuds with charging case', price: 10.99, soldOut: true, category: 'SOUND',quantity: 1 ,sku: 'MI-LST05-2',id: 26},
    
  ];
  constructor(private cartService: CartService,private router : Router) { }

  get filteredProducts() {
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(["/cart"]);
  }
  toggleWishlist(productId: number) {
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
