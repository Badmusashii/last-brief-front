import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isAuthenticated = false;

  constructor(
    private productService: ProductService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
    });
  }
  modifyProduct(id: number) {
    this.route.navigate(['/update'], { queryParams: { id: id } });
  }

  // Méthode pour supprimer le produit
  deleteProduct(id: number) {
    this.route.navigate(['/delete'], { queryParams: { id: id } });
  }
  redirect() {
    this.route.navigate(['/create']);
  }
}
