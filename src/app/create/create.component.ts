import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Category } from '../interface/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(private productService: ProductService, private router: Router) {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      category_id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    const newProduct = this.productForm.value;
    this.productService.create(newProduct).subscribe(() => {
      alert('Produit créé avec succès !');
      this.router.navigate(['/product']);
    });
  }
}
