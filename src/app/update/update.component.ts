import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../interface/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      category: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    this.productService.getOne(id).subscribe((product) => {
      this.productForm.patchValue(product);
    });
    this.productService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }

  onSubmit() {
    const id = this.route.snapshot.queryParams['id'];
    this.productService.update(id, this.productForm.value).subscribe(
      () => {
        alert('Produit mis à jour avec succès');
        this.router.navigate(['/product']);
      }
      // (error) => {
      //   if (error.status === 401) {
      //     alert("Vous n'avez pas la permission de modifier ce produit !");
      //   } else {
      //     alert("Une erreur s'est produite lors de la mise à jour");
      //   }
      //   this.router.navigate(['/product']);
      // }
    );
  }
}
